import axios from "axios";

generateFeed(userID){
    var feed = [] 
    const availUsers = getUsers(); //contains user ID's 
    const likedUser = [];
    const userInterests = //get userID's interests
    //get a bunch of users

        //check if usersID[], add userIDs that liked user to likedUser list
        var i = 0;
        while(feed.length < 10 && i < availUsers.length)
        {
            const currUserID = availUsers[i].id; //get userID
            var likedUser = false; //bool that checks if currUser liked user
            var j;
            for(j = 0; j<availUsers[i].likedList.length; j++){
                if(availUsers[i].likedList[j] == userID)
                {
                    likedUser = true;
                }
            }
            if(likedUser)
            {
                feed.unshift(currUserID);
            }
            else //look at interests
            {
                const currUserInterests = availUsers[i].interests //list of user interests
                //make array of matching interests
                const filteredStrArray = userInterests.filter(value => currUserInterests.includes(value)).filter((value, index, self) => self.indexOf(value) === index);
                if(filteredStrArray.length > 2)
                {
                    feed.push(currUserID);
                }
            }
            i++;
        }


};