import axios from "axios";

export async function generateFeed(userID){
    var feed = []; 
    var matchingUser = await fetch("http://localhost:4000/api/users/" + userID) //get user object using userID
    .then(response => response.json())
    .then(function(data)
    {
        return data;
    })
    .catch(function(error)
    {
        console.log(error);
        console.log("Could not retrieve user object using userID")
    })

    //contains list of all users 
    const availUsers = await fetch("http://localhost:4000/api/users/")
    .then(response => response.json())
    .then(function(data)
    {
        var userArray = data.slice();
        //shuffle the order of users in the array
        for (let i = userArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        
            // swap elements array[i] and array[j]
            // we use "destructuring assignment" syntax to achieve that
            // you'll find more details about that syntax in later chapters
            // same can be written as:
            // let t = array[i]; array[i] = array[j]; array[j] = t
            [userArray[i], userArray[j]] = [userArray[j], userArray[i]];
          }
        return userArray;
    })
    .catch(function(error)
    {
        console.log(error);
        console.log("Could not get list of all users")
    })
    console.log(availUsers[0].id)
    //add users that liked matchingUsers
    var a = 0;
    while(feed.length < 10 && a < availUsers.length)
    {
        var currUser = await fetch("http://localhost:4000/api/users/" + availUsers[a].id) //get currUser based on userID of likes[a]
        .then(response => response.json())
        .then(function(data)
        {
            return data;
        })
        .catch(function(error)
        {
            console.log(error)
            console.log("Could not get currUser based on userID of likes[a]")
        })

        if(JSON.parse(currUser.likes) && JSON.parse(currUser.likes).includes(userID))
        {            
            //add to feed
            feed.unshift(currUser.id);
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
        if(currUserInterests != null){
            console.log(currUserInterests)
            //make array of matching interests
            const filteredStrArray = userInterests.filter(value => currUserInterests.includes(value)).filter((value, index, self) => self.indexOf(value) === index);
            if(!filteredStrArray && filteredStrArray.length > 2)
            {
                feed.push(currUserID);
            }
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
            c++;
            continue;
        }
        feed.push(currUserID)
        c++;
    }

    return feed;
}
