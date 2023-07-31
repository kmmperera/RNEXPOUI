const initState = {

	chats:[],
	error:null,
}
const pushtoarray=(a,n)=>{

return a.push(n);
}
const getchats= (state = initState, action) => {
	switch (action.type) {
	case "getchatssuccess":
            state = {
               			...state,
				error:null,
				chats:action.payload.chats,
				
				
            }
            break;

	case "getchatsfailed":
            state = {
               			...state,
				error:action.payload.error,
				
				
            }
            break;

	case "newmessage":
            state = {
               			...state,
				chats :action.payload.localchat,
				
            }
            break;
  case "logout":
		state={
			
			...initState,
		}
    break;
	default:
		state={...state,}



	}
return state;
}
export default getchats;