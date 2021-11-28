import axios from "axios";

generateFeed(userID){
    const feed = []; //contains user ID's 
    var numFeed = 0; //max is 10
    const likedUser = [];
    //get a bunch of users
    axios.all([getUserID(), getLikes()])
    .then((userIDs, userLikes)=>{
        //check if usersID[], add userIDs that liked user to likedUser list
        var i = 0;
        var numUsers;
        while(numFeed < 10 && i < numUsers)
        {
            var currUserID; //get userID
            var likedUser; //bool that checks if currUser liked user
            if(likedUser)
            {
                numFeed.unshift(currUserID);
            }
            else(/*check if enough interests to match*/)
            {
                numFeed.push(currUserID);
            }
            i++;
        }
        //
    })


}