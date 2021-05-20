package utils

import (
	"fmt"

	"github.com/spf13/viper"
)

//The struct to hold data read from the env file
type JWTKeys struct {
	Access_Token      string `mapstructure:"ACCESS_TOKEN"`
	Refresh_Token     string `mapstructure:"REFRESH_TOKEN"`
	STRIPE_SECRET_KEY string `mapstructure:"STRIPE_SECRET_KEY"`
}

//Function to get the Access tokens from the config file
//Pass path of the file to the .env file from the call location

func GetAccessToken(path string) (tokens JWTKeys, err error) {

	//configure viper to read the env and type of file
	viper.SetConfigName("app")
	viper.SetConfigType("env")
	viper.AddConfigPath(path)

	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		fmt.Print("Error reading the line", err)
		return
	}

	err = viper.Unmarshal(&tokens)
	return
}
