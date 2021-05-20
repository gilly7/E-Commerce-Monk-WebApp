package middleware

import (
	"fmt"
	"net/http"
	"strings"

	"monk.com/monk/src/server/utils/tokens"
)

func Authenticate(f http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		authorizationHeader := r.Header.Get("Authorization")

		if len(authorizationHeader) == 0 {
			fmt.Fprint(w, http.StatusUnauthorized)
			fmt.Print("No Authorization Header")
			return
		}

		fields := strings.Fields(authorizationHeader)

		if len(fields) < 2 {
			fmt.Print("No Access Token")
			fmt.Fprint(w, http.StatusUnauthorized)
			return
		}

		access_token := fields[1]

		_, err := tokens.VerifyToken(access_token)

		if err != nil {
			fmt.Print(err)
			fmt.Fprint(w, http.StatusUnauthorized)
			return
		}

		f.ServeHTTP(w, r)
	}
}
