# Basketball Doctor


<img src="https://github.com/toant13/Alexa_skills/blob/master/skill-basketball-doctor/publishingAssets/basket_ball_doctor_logo_large.jpg?raw=true">


This skill allows you to list all the  injured players for the team you're interested in.

## Example Interaction

`you`: Alexa, ask Doctor basketball who's injured on the Portland Trail Blazers?

`Alexa`: The Portland Trail Blazers have the following injuries: Bob Wilson with knee, Joe Fakename with head, Michael Wilson with elbow



## To invoke the function from `Apex` framework locally:

`apex invoke nba_info < testAssets/GetTeamInjuries.json --logs`

`apex invoke nba_info < testAssets/GetTeamInjuries76ers.json --logs`
