import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Image, FlatList, TextInput, Modal, Alert} from 'react-native';
import {useRoute, useNavigation} from "@react-navigation/native";
import {EvilIcons} from "@expo/vector-icons";
import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import Commentitem from './Commentitem';
import Closemodal from './Closemodal';
import Backbutton from './Backbutton';

import {deletePost, like, unlike, comment, redirectafterdeletepost} from '../actions/admin/post';

export default function Postdetails() {

    const {params: {item, previous_screen, Parentcompo}, } = useRoute();
    const navigation = useNavigation();
    const commentref = useRef(null);

    const [deletedcommentid, setDeletedcommentid] = useState("");
    const dummyimg = "https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg";

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [textarea, setTextarea] = useState("");

    const {user: userred} = auth;
    const [newitem, setNewitem] = useState(item);
    const postred = useSelector((state) => state.post);

    const [deletepostid, setDeletepostid] = useState("");
    const [likedpostid, setLikedpostid] = useState("");
    const [dislikedpostid, setDislikedpostid] = useState("");
    const [closemodalopen, setClosemodalopen] = useState(false);

    let hasliked = newitem && newitem.likes && newitem.likes.includes(userred._id);
    let hascomments = newitem.comments && newitem.comments.length > 0;


    useEffect(() => {



        if (postred.postdeleted == true) {

            // previous_screen == "Profile" ? navigation.navigate("Profile") : navigation.navigate(Parentcompo);
            navigation.navigate("Feed");
        }

        return () => {
            let obj = {val: false};
            dispatch(redirectafterdeletepost(obj));
        }


    }, [postred.postdeleted]);


    useEffect(() => {

        if (deletepostid && deletepostid != "") {

            dispatch(deletePost({postId: deletepostid}));
        }

    }, [deletepostid]);

    useEffect(() => {

        if (likedpostid && likedpostid != "") {

            dispatch(like({postId: likedpostid, userId: userred._id}));
        }

    }, [likedpostid]);

    useEffect(() => {

        if (dislikedpostid && dislikedpostid != "") {

            dispatch(unlike({postId: dislikedpostid, userId: userred._id}));
        }

    }, [dislikedpostid]);

    useEffect(() => {

        setNewitem(item);
        //  item=postred.feed[item._id];

    }, [item]);


    useEffect(() => {
     
       
            setNewitem(postred.feed[item._id]);

        
    }, [postred.feed]);




    const newcomment = () => {

        if (textarea && textarea != "") {
            dispatch(comment({postId: newitem._id, comment: {postedBy: userred._id, text: textarea}}));
            setTextarea("");
            commentref.current.clear();

        }

    }

    const deletecommentfunc = (commentid, postid) => {

        if (commentid) {

            dispatch(deletecomment({postId: postid, comment: {_id: commentid}}));

        }

    }



    const propicurl = newitem.postedBy.pofilePicture ? newitem.postedBy.pofilePicture : "https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg";



    return (
        <SafeAreaView style={Mystyles.postdetailsview}>
            <View style={Mystyles.statusbarempty}></View>

            <Backbutton headername="Post Details" backscreen="Feed"/>

            <View style={Mystyles.feedconatiner}>

                <View style={Mystyles.feeditemview}>
                    <View style={Mystyles.propicwreapper}>
                        <Image
                            style={Mystyles.profileimg}
                            source={{uri: propicurl}}


                        />
                    </View>
                    <View style={Mystyles.postcontentwrapper}>
                        <TouchableOpacity onPress={() => {newitem.postedBy._id == userred._id ? navigation.navigate("Profile") : navigation.navigate("Userprofile", {showuserid: newitem.postedBy._id})}}>
                            <Text style={Mystyles.postedby}>{`${newitem.postedBy.firstName} `}</Text>
                        </TouchableOpacity>
                        <Text style={Mystyles.postcontenttext}>{newitem.text}</Text>
                        <View style={Mystyles.iconview}>
                            <View style={Mystyles.iconwrapperview}>
                                <EvilIcons name="comment" size={18} color="black" />
                                <Text style={Mystyles.postactiondatatext}>{newitem.comments.length}</Text>
                            </View>
                            <View style={Mystyles.iconwrapperview}>
                                <TouchableOpacity onPress={() => {hasliked ? setDislikedpostid(newitem._id) : setLikedpostid(item._id)}}>
                                    <EvilIcons style={hasliked ? Mystyles.likebtn : null} name="like" size={18} color="black" />
                                </TouchableOpacity>
                                <Text style={Mystyles.postactiondatatext}>{newitem.likes.length}</Text>
                            </View>




                        </View>



                    </View>
                    <View>
                        <View>

                            <TouchableOpacity onPress={() => {setClosemodalopen(true)}}>
                                <MaterialCommunityIcons name="dots-vertical" size={18} color="black" />

                            </TouchableOpacity>

                        </View>
                        <View style={Mystyles.modalview}>
                            <View style={Mystyles.absolutemodalview}>

                                <Closemodal visible={closemodalopen}>
                                    <View style={Mystyles.modalclosebtnview}>
                                        <TouchableOpacity style={Mystyles.closemodalbtn} onPress={() => {setClosemodalopen(false)}}>

                                            <MaterialIcons name="cancel-presentation" size={24} color="black" />
                                        </TouchableOpacity>


                                    </View>
                                    <View>
                                        {newitem.postedBy._id == userred._id ?
                                            <View style={Mystyles.deletebtnview}>
                                                <TouchableOpacity style={Mystyles.deletetouchable} onPress={() => {setDeletepostid(newitem._id)}}>

                                                    <MaterialIcons name="cancel-presentation" size={24} color="red" />
                                                    <Text style={Mystyles.deletetext}>Delete this post </Text>
                                                </TouchableOpacity>
                                            </View>
                                            : <View style={Mystyles.nopermissionview}>
                                                <Text style={Mystyles.nopermissiontext}>You do not have permissions to Delete this post!</Text>
                                            </View>
                                        }
                                    </View>
                                </Closemodal>

                            </View>


                        </View>
                        <View style={Mystyles.closebtn}>{
                            // newitem.postedBy._id == userred._id ?
                            //     <TouchableOpacity onPress={() => {setDeletepostid(newitem._id)}}>
                            //         <MaterialIcons name="cancel-presentation" size={24} color="red" />
                            //     </TouchableOpacity>
                            //     : null
                        }
                        </View>

                    </View>

                </View>

            </View>
            <View style={Mystyles.commentsectionview}>
                <FlatList

                    data={newitem.comments}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => {return (<Commentitem Comments={item} postid={newitem._id} loggeduserid={userred._id} />)}}
                    keyExtractor={(item) => {return (item._id)}}


                />

            </View>
            <View style={Mystyles.writecommentview}>
                <TextInput
                    placeholder="Write a comment"
                    style={Mystyles.inputtext}
                    defaultValue={textarea}
                    onChangeText={(textarea) => {setTextarea(textarea);}}
                    ref={commentref}
                />
                <TouchableOpacity onPress={newcomment}>
                    <Text style={Mystyles.commentbtntext}>Comment</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const Mystyles = StyleSheet.create({
    statusbarempty: {height: 30},
    postdetailsview: {flex: 1},
    feedconatiner: {backgroundColor: "#e8e6e6", borderBottomColor: "#b8b6b6", borderBottomWidth: 1, },
    feeditemview: {padding: 20, flexDirection: "row"},
    profileimg: {height: 44, width: 44, borderRadius: 22, flexShrink: 0, },
    propicwreapper: {marginRight: 20},
    postcontentwrapper: {flex: 1},
    postcontenttext: {paddingRight: 5, marginTop: 10},
    postedby: {fontSize: 14, fontWeight: 700},
    iconview: {flexDirection: "row", paddingRight: 30, marginTop: 15, justifyContent: "space-between"},
    iconwrapperview: {flexDirection: "row", alignItems: "center"},
    postactiondatatext: {fontSize: 11},
    commentsectionview: {flex: 1},
    writecommentview: {
        flexDirection: "row", marginBottom: 10, alignItems: "center", paddingHorizontal: 30,
        borderColor: "#f5fff5", borderWidth: 1, backgroundColor: "#f5fff5",
        paddingVertical: 10
    },
    inputtext: {flex: 1},
    commentbtntext: {fontWeight: 700, color: "#35b870"},
    likebtn: {color: "blue"},
    closebtn: {},
    modalview: {},
    absolutemodalview: {},
    deletetouchable: {flexDirection: "row", alignItems: "center", marginTop: 40},
    deletetext: {marginLeft: 10, fontSize: 16, fontWeight: 500},
    closemodalbtn: {flexDirection: "row", justifyContent: "flex-end"},
    modalclosebtnview: {flexDirection: "row", justifyContent: "flex-end"},
    nopermissionview: {flexDirection: "row", alignItems: "center", marginTop: 40},
    nopermissiontext: {textAlign: "center"},
    deletebtnview: {flexDirection: "row", justifyContent: "flex-start"}
});