import axios from "axios";

export function generateFeed(userID){
    var feed = []; 
    var matchingUser = fetch("http://localhost:4000/api/users/:" + userID) //get user object using userID
    .then(response => response.json())
    .then(function(data)
    {
        return data;
    })
    .catch(function(error)
    {

    })

    //contains list of all users 
    const availUsers = fetch("http://localhost:4000/api/users/")
    .then(response => response.json())
    .then(function(data)
    {
        return data.slice();
    })
    .catch(function(error)
    {

    })

    //add mutually liked users
    var a = 0;
    while(feed.length < 10 && a < matchingUser.likedList.length)
    {
        var currUser = fetch("http://localhost:4000/api/users/:" + matchingUser.likedList[a]) //get currUser based on userID of likedList[i]
        .then(response => response.json())
        .then(function(data)
        {
            return data;
        })
        .catch(function(error)
        {
    
        })
        if(currUser.likedList.includes(userID))
        {            
            //add to feed
            feed.unshift(currUserID);
        }
        a++;
    }

    //add by interests
    const userInterests = matchingUser.interests//get userID's interests        
    //add users with common interests
    var i = 0;
    while(feed.length < 10 && i < availUsers.length)
    {   
        const currUserID = availUsers[i].id; //get userID of current user
        if(userID == currUserID || feed.includes(currUserID)) //skip if user matched with itself or currUser is already in list
        {
            i++;
            continue;
        }
        const currUserInterests = availUsers[i].interests //list of user interests
                //make array of matching interests
        const filteredStrArray = userInterests.filter(value => currUserInterests.includes(value)).filter((value, index, self) => self.indexOf(value) === index);
        if(filteredStrArray.length > 2)
        {
            feed.push(currUserID);
        }
        i++;
    }

    //fill up rest of feed
    var c = 0;
    while(feed.length < 10 && c < availUsers.length)
    {
        const currUserID = availUsers[c].id;
        if(userID == currUserID || feed.includes(currUserID)) //skip if user matched with itself or currUser is already in list
        {
            i++;
            continue;
        }
        feed.push(currUserID)
    }

    return feed;
}