import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoOutlineIcon from '@material-ui/icons/InfoOutlined';
import {useSelector} from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import {useCollection,useDocument} from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase';

function Chat() {
    const [user] = useAuthState(auth);
    const chatRef = useRef(null)

    const roomId = useSelector(selectRoomId)
    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    );

    const [roomMessage, loading] = useCollection(
        roomId && db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', "asc")
    );

    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
          });
    },[roomId, loading]); 

    return (
        <ChatContainer>
            {roomDetails && roomMessage && (
                <>
                    <Header>
                        <HeaderLeft>
                            <h4><strong>#{roomDetails?.data().name}</strong></h4>
                            <StarBorderIcon/>
                        </HeaderLeft>

                        <HeaderRight>
                            <p>
                                <InfoOutlineIcon/> Details
                            </p>
                        </HeaderRight>
                    </Header>
                    <ChatMessage>
                        {roomMessage?.docs.map(doc=> {
                            const {message, timestamp, user, userImage} = doc.data();

                            return(
                                <Message
                                    key={doc.id}
                                    message={message}
                                    timestamp={timestamp}
                                    user={user}
                                    userImage={userImage}
                                />
                            )
                        })}
                        <ChatBottom ref={chatRef}/>
                    </ChatMessage>

                    <ChatInput
                        user={user}
                        chatRef={chatRef}
                        channelName={roomDetails?.data().name}
                        channelId={roomId}
                    />
                </>
            )}
        </ChatContainer>
    )
}

export default Chat
const ChatBottom = styled.div`
    padding-bottom : 100px
`;

const ChatMessage = styled.div`

`;

const ChatContainer = styled.div`
    flex : 0.7;
    flex-grow : 1;
    overflow-y : scroll;
    margin-top  : 60px
`;

const Header = styled.div`
    display : flex;
    justify-content : space-between;
    padding : 20px;
    border-bottom: 1px solid lightgray;
`;  

const HeaderLeft = styled.div`
    display : flex;
    align-items : center;
    >h4{
        display : flex;
        text-transform : lowercase;
        margin-right : 10px;
    }
    >h4> .MuiSvgIcon-root{
        margin-left:20px;
        font-size: 18px;
    }

`;

const HeaderRight = styled.div`
    display : flex;
    >p{
        display : flex;
        align-items : center;
        font-size  :14px;
    }
    >p> .MuiSvgIcon-root{
        margin-right : 5px;
        font-size: 16px
    }


`;