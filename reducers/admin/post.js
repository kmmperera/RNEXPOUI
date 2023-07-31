const initState = {

	posts:{},
	showuserposts:{},
	error:null,
	likedpost:{},
	unlikedpost:{},
	commentedpost:{},
	deletedcommentpost:{},
	feed:{},
	deletedpost:{},
	postbyid:{},
	newpostcreated:false,
	postdeleted:false,
}

const post= (state = initState, action) => {
	switch (action.type) {
	case "getpostssuccess":
            state = {
               			...state,
				error:null,
				posts:{...state.posts,...action.payload.posts},
				

				
            }
            break;
	case "getpostsuccess":
	
            state = {
               			...state,
				error:null,
				posts:{...action.payload.postswithpropic , ...state.posts  },
				feed:{...action.payload.postswithpropic , ...state.feed},
				newpostcreated:true,
				
            }
            break;		

	case "getpostfailed":
            state = {
               			...state,
				error:action.payload.error,
				
				
            }
			break;
			
	case "showuserpostsuccess" :
			state={
				...state,
				error:null,
				showuserposts:action.payload.posts,
			


			}	
			break;

	case "showuserpostfailed" :
			state={
				...state,
				error:action.payload.error,

			}	
			break;		
			
			

	case "clearposts":
            state = {
               		...state,
					posts:{},
				
				
            }
            break;
	case "likesuccess":

            state = {
               		...state,
					likedpost:action.payload.likedPost,
					posts:{...state.posts,...action.payload.likedPost},
					feed:{...state.feed,...action.payload.likedPost}

				
            }
            break;

case "likefailed":
            state = {
               		...state,
				error:action.payload.error,
				
				
            }
            break;

case "unlikesuccess":
            state = {
               		...state,
					unlikedpost:action.payload.unlikedPost,
					posts:{...state.posts,...action.payload.unlikedPost},
					feed:{...state.feed,...action.payload.unlikedPost}

            }
            break;

case "unlikefailed":
            state = {
               		...state,
				error:action.payload.error,
				
				
            }
            break;

case "commentsuccess":
            state = {
               		...state,
					commentedpost:action.payload.commentedPost,
					posts:{...state.posts,...action.payload.commentedPost},
					feed:{...state.feed,...action.payload.commentedPost}

            }
            break;

case "commentfailed":
            state = {
               		...state,
				error:action.payload.error,
				
				
            }
            break;

case "commentdeletesuccess":
			
            state = {
               		...state,
					deletedcommentpost:action.payload.uncommentedPost,
					posts:{...state.posts,...action.payload.uncommentedPost},
					feed:{...state.feed,...action.payload.uncommentedPost}
					
				
            }
            break;

case "commentdeletefailed":
            state = {
               	...state,
				error:action.payload.error,
				
				
            }
            break;

case "postByIDsuccess":
            state = {
               		...state,
					postbyid:action.payload.post,
				
				
            }
            break;

case "postByIDfailed":
            state = {
               		...state,
				error:action.payload.error,
				
            }
            break;

case "feedsuccess":
            state = {
               		...state,
					feed:action.payload.feed
				
				
            }
            break;

case "feedfailed":
            state = {
               	...state,
				error:action.payload.error,
				
            }
            break;
			
case "deletepostsuccess":
			let deletedid=action.payload.details.postId;
		  let newposts=state.posts;
		  delete newposts[deletedid] ;
		  
		 
		  let newfeed=state.feed;
		  delete newfeed[deletedid] ;

            state = {
               	...state,
				deletedpost:action.payload.deletedPost,
				posts:newposts,
				feed:newfeed,
				postdeleted:true,
            }
            break;
case "deletepostfailed":
            state = {
               	...state,
				error:action.payload.error,
				
            }
            break;			

			
case "unmountcreatepostcompo":
			state={
				...state,
				newpostcreated:false,
			}		
			break;	
case "unmountpostdetails":
			state={
				...state,
				postdeleted:false,
			}			

	default:
		state={...state,}



	}
return state;
}
export default post;