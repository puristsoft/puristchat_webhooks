
PuristChat designed to ease the process of integrating backend applications that provide support to end customers, in simple scenario,  operator/agent chat support  may solve a problem without the need to have backend system integrations , however , many enterprise customers may found that not enough , webhooks is the answer to extend support whilst providing more details about the case such as getting customer profile , account , purchase history ..etc. 

Our goal with PuristChat is to make customer support easy, fun, and accessible to enterprise with the desire to make better customer relationship. 

## [Start with PuristChat ]( http://www.dev.puristchat.com/signup/get_started )
 
PuristChat is a hosted development environment for building chat support apps.
Developers using PuristChat get the full capabilities of APIs for chat support applications, approval is required to get your account setup. 

## Setup a test user (end customer )

You need to setup a user to testing web-hooks , company->user->New User 

## Setup an operator or agent 

Setup operator , operator -> new 

## Setup a support category 
Setup a support category -> new , enter the web-hooks URL , make URL points to /puristchat/receive , you can change in nodejs app and change here later.

## Play arround

Open browser session 

[Login as operator in PuristChat ]( http://www.dev.operator.puristchat.com/)

Wait for end user to chat 

Open new browser session 

[Login as end customer in PuristChat ]( http://www.dev.user.puristchat.com/)

Say something to agent 

## Webhooks , Run nodejs sample 
```

Clone webhook
Cd /webhook  

npm install
npm run 

```


## Go to end user portal sign-in with user you have defined , type something you will connect to agent 

Type hello , a message will reply 

That’s it !. 
 


 

  


