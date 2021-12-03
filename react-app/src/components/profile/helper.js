import axios from "axios";


export async function generateFeed(userID){
    var feed = []; 
    var matchingUser = await fetch("http://localhost:4000/api/users/" + userID) //get user object using userID
    .then(response => response.json())
    .then(function(data)
    {
        if(data.likes==null) data.likes = [];
        if(data.matches==null) data.matches = [];
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
        if(data.likes==null) data.likes = [];
        if(data.matches==null) data.matches = [];
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
    //add users that liked matchingUsers
    var a = 0;
    while(feed.length < 10 && a < availUsers.length)
    {
        var currUser = await fetch("http://localhost:4000/api/users/" + availUsers[a].id) //get currUser based on userID of likes[a]
        .then(response => response.json())
        .then(function(data)
        {
            if(data.likes==null) data.likes = [];
            if(data.matches==null) data.matches = [];
            return data;
        })
        .catch(function(error)
        {
            console.log(error)
            console.log("Could not get currUser based on userID of likes[a]")
        })

        if(matchingUser.likes.indexOf(currUser.id) != -1){
            var ind = availUsers.indexOf(currUser.id);
            availUsers.splice(ind, 1);
            continue;
        }
        else if(currUser.likes != null && currUser.likes.includes(userID))
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
    while(feed.length < 10 && i < availUsers.length && userInterests !=null)
    {   
        const currUserID = availUsers[i].id; //get userID of current user
        if(matchingUser.likes.indexOf(currUserID) != -1){
            var ind = availUsers.indexOf(currUserID);
            availUsers.splice(ind, 1);
            continue;
        }
        if(userID == currUserID || feed.includes(currUserID)) //skip if user matched with itself or currUser is already in list or if already liked
        {
            i++;
            continue;
        }
        const currUserInterests = availUsers[i].interests //list of user interests
        if(currUserInterests != null && userInterests !=null){
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
        if(matchingUser.likes.indexOf(currUserID) != -1){
            var ind = availUsers.indexOf(currUserID);
            availUsers.splice(ind, 1);
            continue;
        }
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

export async function sendLike(userID, userIDLiked){
    var currUserLiked = await fetch("http://localhost:4000/api/users/" + userIDLiked) //get currUser based on userID of likes[a]
        .then(response => response.json())
        .then(function(data)
        {
            if(data.likes==null) data.likes = [];
            if(data.matches==null) data.matches = [];
            return data;
        })
        .catch(function(error)
        {
            console.log(error)
            console.log("Could not get currUser based on userID of likes[a]")
        })

    const currUser = await fetch("http://localhost:4000/api/users/" + userID) //get user object using userID
    .then(response => response.json())
    .then(function(data)
    {
        if(data.likes==null) data.likes = [];
        if(data.matches==null) data.matches = [];
        data.likes.push(userIDLiked);
        if(currUserLiked.likes!=null && currUserLiked.likes.includes(userID))
        {
            data.matches.push(userIDLiked);
            if(currUserLiked.matches==null) currUserLiked.matches = [];
            currUserLiked.matches.push(userID);
            axios.put("http://localhost:4000/api/users/" + userIDLiked,currUserLiked);
        }
        return data;
    })
    .catch(function(error)
    {
        console.log(error);
        console.log("Could not retrieve user object using userID")
    })
    const currUserURL = "http://localhost:4000/api/users/" + userID; 
    axios.put(currUserURL, currUser);
    
}

export async function getMatches(userID) {
    var user = await fetch("http://localhost:4000/api/users/" + userID) //get user object using userID
        .then(response => response.json())
        .then(function(data)
        {
            if(data.matches==null) data.matches = [];
            return data;
        })
        .catch(function(error)
        {
            console.log(error);
            console.log("Could not retrieve user object using userID")
        });
    return user.matches;
}




export async function queryFeed(interests){
    const feedAll = await fetch("http://localhost:4000/api/users/")
    .then(response => response.json())
    .then(function(data)
    {
        if(data.likes==null) data.likes = [];
        if(data.matches==null) data.matches = [];
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

    const queryResult = [];
    for(let i=0;i<feedAll.length;i++){
        let flag = true;
        for(let k=0;k<interests.length && flag;k++){
            if(!feedAll[i].interests.includes(interests[k])) flag = false;
        }
        if(flag){
            queryResult.push(feedAll[i].id);
        }
    }
    return queryResult;
}