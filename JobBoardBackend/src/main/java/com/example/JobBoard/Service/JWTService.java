package com.example.JobBoard.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {

    private String sk = "";
    public  JWTService(){
        try {
            KeyGenerator keygen = KeyGenerator.getInstance("HmacSHA256");
            keygen.init(256);
            SecretKey secretrKey = keygen.generateKey();
            sk=Base64.getEncoder().encodeToString(secretrKey.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }


    public String generateToken(String  email) {
        Map<String , Object> claims = new HashMap<>();

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+1000*60*60*10))
                .and()
                .signWith(getKey())
                .compact();


    }

    private SecretKey getKey() {
        byte[] kb = Decoders.BASE64.decode(sk);
        return Keys.hmacShaKeyFor(kb);
    }


    public String extractEmail(String token) {
        //debugToken(token);
        // Validate token format before processing
        if (token == null || token.trim().isEmpty()) {
            throw new IllegalArgumentException("Token cannot be null or empty");
        }

        // Remove any whitespace
        token = token.trim();

//        // Validate JWT format (should have exactly 2 dots)
//        if (token.split("\\.").length != 3) {
//            throw new MalformedJwtException("Invalid JWT format");
//        }

        try {
            return extractClaim(token, Claims::getSubject);
        } catch (Exception e) {
            System.out.println("Failed to extract username: " + e.getMessage());
            return null;
        }

    }

    private <T> T extractClaim(String token, Function<Claims,T> claimResolver){
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token){
        return Jwts
                .parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractEmail(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token){
        return extrectExpiration(token).before(new Date());
    }

    private  Date extrectExpiration(String token){
        return extractClaim(token,Claims::getExpiration);
    }

    public void debugToken(String token) {
        System.out.println(token);
        System.out.println("Token length: " + token.length());
        System.out.println("Token contains spaces: " + token.contains(" "));
        System.out.println("Token contains tabs: " + token.contains("\t"));
        System.out.println("Token contains newlines: " + token.contains("\n"));
        System.out.println("Token parts: " + token.split("\\.").length);
    }

}