const initState = {

	users: [],
	error: null,
	suggestions: {},
	userbyid: [],
	updatedUser: {},
	userafterpicupdated: {},
	inbox: [],
	followed: false,
	showuserbyid: [],
	followingsarray:[],
	profilepicloading:false,
	messagesloading:false,


}

const getusers = (state = initState, action) => {
	switch (action.type) {

		case "messagereqloading":
		state={
			...state,
			messagesloading:true,
		}
		break;

		case "profilepicloading":
		state={
			...state,
			profilepicloading:true,
		}
		break;



		case "loginsuccess":
		state={
			...state,
			followingsarray:action.payload.user.following,
		}
		break;

		case "getallusersuccess":
			state = {
				...state,
				users: action.payload.users,


			}
			break;

		case "getalluserfailed":
			state = {
				...state,
				error: action.payload.error,


			}
			break;

		case "friendsuggestionssuccess":
			state = {
				...state,
				suggestions: action.payload.friendsuggestions,


			}
			break;
		case "friendsuggestionsfailed":
			state = {
				...state,
				error: action.payload.error,


			}
			break;

		case "getusersuccess":
			state = {
				...state,
				userbyid: action.payload.user,


			}
			break;

		case "getuserfailed":
			state = {
				...state,
				error: action.payload.error,


			}
			break;


		case "showusersuccess":
			state = {
				...state,
				showuserbyid: action.payload.user,


			}
			break;

		case "showuserfailed":
			state = {
				...state,
				error: action.payload.error,


			}
			break;




		case "followsuccess":
			state = {
				...state,
				followingsarray:[...state.followingsarray, Object.keys(action.payload.updatedUser)[0] ] ,
				updatedUser: action.payload.updatedUser,
			
				followed: state.followed == true ? false : true ,
			}
			break;
		case "followfailed":
			state = {
				...state,
				error: action.payload.error,


			}
			break;
		case "unfollowsuccess":

			state = {
				...state,
				updatedUser: action.payload.updatedUser,
				suggestions: {...state.suggestions, ...action.payload.updatedUser},
				followingsarray:state.followingsarray.filter((item)=>{return item != Object.keys(action.payload.updatedUser)[0]  }),




			}
			break;
		case "unfollowfailed":
			state = {
				...state,
				error: action.payload.error,


			}
			break;

		case "changeprofiepicsuccess":
			state = {
				...state,
				userafterpicupdated: action.payload.updatedUser,
				profilepicloading:false,

			}
			break;

		case "changeprofiepicfailed":
			state = {
				...state,
				error: action.payload.error,
				profilepicloading:false,

			}
			break;
		case "getinboxsuccess":
			state = {
				...state,
				inbox: action.payload.inbox[0].inbox,
				messagesloading:false,

			}
			break;
		case "getinboxfailed":
			state = {
				...state,
				error: action.payload.error,
				messagesloading:false,

			}
			break;


	}
	return state;
}
export default getusers;