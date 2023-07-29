//import axios from 'axios';
import axios from '../../API/apiaxios';

const getallusers=()=>{
	return async (dispatch) => {
	try{
		let res;
		res=await axios.get("/getallusers");
		if (res.status === 200) {
			let {users}=res.data;
			dispatch({ type: "getallusersuccess",payload:{users}});
		}
		else{
			let {error}=res.data;
			dispatch({ type: "getalluserfailed",payload:{error}});
		}
	}
	catch(error){dispatch({ type: "getalluserfailed",payload:{error}});}
	}
}




const getInbox=(details)=>{
	return async (dispatch) => {
	try{
		let res;
		// details={id:...}
		res=await axios.post("/getInbox",{details});
		if (res.status === 200) {
			let {inbox}=res.data;
			dispatch({ type: "getinboxsuccess",payload:{inbox}});
		}
		else{
			let {error}=res.data;
			dispatch({ type: "getinboxfailed",payload:{error}});
		}
	}
	catch(error){dispatch({ type: "getinboxfailed",payload:{error}});}
	}
}





const getfriendsuggestions=(details)=>{
	return async (dispatch) => {
	try{
		let res;
		res=await axios.post("/getfriendsuggestions",{details});
		if (res.status === 200) {
			let {friendsuggestions}=res.data;
			dispatch({ type: "friendsuggestionssuccess",payload:{friendsuggestions}});
		}
		else{
			let {error}=res.data;
			dispatch({ type: "friendsuggestionsfailed",payload:{error}});
		}
	}
	catch(error){dispatch({ type: "friendsuggestionsfailed",payload:{error}});}
	}
}
const userByID=(details)=>{
	return async (dispatch) => {
	try{
		let res;
		//details={id:}
		res=await axios.post("/userByID",{details});
		if (res.status === 200) {
			let {user}=res.data;
			dispatch({ type: "getusersuccess",payload:{user}});
		}
		else{
			let {error}=res.data;
			dispatch({ type: "getuserfailed",payload:{error}});
		}
	}
	catch(error){dispatch({ type: "getuserfailed",payload:{error}});}
	}
}

const showuserByID=(details)=>{
	return async (dispatch) => {
	try{
		let res;
		//details={id:}
		res=await axios.post("/userByID",{details});
		if (res.status === 200) {
			let {user}=res.data;
			dispatch({ type: "showusersuccess",payload:{user}});
		}
		else{
			let {error}=res.data;
			dispatch({ type: "showuserfailed",payload:{error}});
		}
	}
	catch(error){dispatch({ type: "showuserfailed",payload:{error}});}
	}
}




const follow=(details)=>{
	return async (dispatch) => {
	try{
		let res;
		// details={followingid:,loggeduser:};
		res=await axios.post("/follow",{details});
		if (res.status === 200) {
			let {updatedUser}=res.data;
			dispatch({ type: "followsuccess",payload:{updatedUser}});
		}
		else{
			let {error}=res.data;
			dispatch({ type: "followfailed",payload:{error}});
		}
	}
	catch(error){dispatch({ type: "followfailed",payload:{error}});}
	}
}



const unfollow=(details)=>{
	return async (dispatch) => {
	try{
		let res;
		// details={followingid:,loggeduser:};
		res=await axios.post("/unfollow",{details});
		if (res.status === 200) {
			let {updatedUser}=res.data;
			dispatch({ type: "unfollowsuccess",payload:{updatedUser,details}});
		}
		else{
			let {error}=res.data;
			dispatch({ type: "unfollowfailed",payload:{error}});
		}
	}
	catch(error){dispatch({ type: "unfollowfailed",payload:{error}});}
	}
}
const changeProfilePic=(details)=>{

	let config = {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	  };
	return async (dispatch) => {
	try{
		let res;
		// details={followingid:,loggeduser:};
		res=await axios.post("/changeProfilePic",details,config);
		if (res.status === 200) {
			let {updatedUser}=res.data;
			dispatch({ type: "changeprofiepicsuccess",payload:{updatedUser}});
			dispatch({ type: "propicchangeforauth",payload:{updatedUser}});
		//	console.log(res.data.updatedUser);
		}
		else{
			let {error}=res.data;
			dispatch({ type: "changeprofiepicfailed",payload:{error}});
			console.log("axios error for change profile pic: " ,error);
		}
	}
	catch(error){
		dispatch({ type: "changeprofiepicfailed",payload:{error}});
		console.log("axios error for change profile pic: " ,error);
	}
	}
}

export {getallusers,getfriendsuggestions,userByID,follow,unfollow,changeProfilePic,getInbox,showuserByID};