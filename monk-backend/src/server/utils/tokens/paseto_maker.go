package tokens

import (
	"time"

	"github.com/o1egl/paseto"
	"monk.com/monk/src/server/utils"
)

func SignTokens(id string) (encodedToken string, err error) {

	//Access the Access_Token from the  env file
	Access, _ := utils.GetAccessToken(".")

	//Declare variables to hold values for the token
	duration := 2
	symmetricKey := []byte(Access.Access_Token)
	now := time.Now()
	exp := now.Add(time.Duration(+duration) * time.Minute)
	nbt := now

	//Create a new paseto struct that will be decrypted
	jsonToken := paseto.JSONToken{
		Audience:   id,
		Issuer:     "http://localhost:9000",
		Subject:    "Token Signing",
		IssuedAt:   now,
		Expiration: exp,
		NotBefore:  nbt,
	}

	//Add Customised claims to the token
	jsonToken.Set("data", "This is the signed Message")

	//Encrypt the Message
	token, err := paseto.NewV2().Encrypt(symmetricKey, jsonToken, nil)

	if err != nil {

		return "", err
	}

	return token, nil

}

func VerifyToken(recieved string) (payload *paseto.JSONToken, err error) {

	var newJsonToken paseto.JSONToken

	//Access the Access_Token from the  env file
	Access, _ := utils.GetAccessToken(".")
	symmetricKey := []byte(Access.Access_Token)

	err = paseto.NewV2().Decrypt(recieved, symmetricKey, &newJsonToken, nil)

	if err != nil {
		return nil, err
	}
	err = newJsonToken.Validate()
	if err != nil {
		return nil, err
	}

	return &newJsonToken, err
}
