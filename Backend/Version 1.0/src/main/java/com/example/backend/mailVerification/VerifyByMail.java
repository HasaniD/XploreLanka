package com.example.backend.mailVerification;

import com.example.backend.Models.MailModel;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;
import java.util.Random;

public class VerifyByMail {

    private final static  String characterList = "1234567890";
    private static Random random = new Random();
    private  static String OTP = "";

    public boolean verifyMail(String mail) {
        final String username = "xplorelanka@gmail.com";
        final String password = "informates@2020";

        Properties properties = new Properties();
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.post", "465");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.socketFactory.port", "465");
        properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");

        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try{

            char character;
            for (int c=0; c<7;c++){
                if (c==3){
                    OTP +=" ";
                }else{
                    character = characterList.charAt(random.nextInt(characterList.length()));
                    OTP +=character;
                }
            }
            System.out.println(OTP);

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(String.valueOf(mail)));
            message.setSubject("Verification code from XploreLanka");
            message.setText("Welcome To Xplore Lanka: " + OTP + ". \n" +
                    "               -InforMates");

            Transport.send(message);

            System.out.println("Successfully send!");

            return true;

        }

        catch(MessagingException ex){
            ex.printStackTrace();

            return false;

        }
    }

}
