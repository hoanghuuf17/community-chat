import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
// import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

 
function Header() {
    const [user] = useAuthState(auth);
     return (
         <HeaderContainer>
            {/* header left */}
            <HeaderLeft>
                <HeaderAvatar 
                    onClick={ () => auth.signOut()}
                    alt={user?.displayName}
                    src={user?.photoURL}
                />
                <ArrowLeftIcon/>
                <p> Sign out</p>
                {/* <AccessTimeIcon/>  */}
            </HeaderLeft>
            {/* header search  */}
            <HeaderSearch>
                <SearchIcon/>
                <input placeholder='Search'/>
            </HeaderSearch>


            {/* header right */}
            <HeaderRight>
                <HelpOutlineIcon/>
            </HeaderRight>
         </HeaderContainer>
     )
 }
 
 export default Header
 
const HeaderContainer = styled.div`
    display : flex;
    position: fixed;
    width : 100%;
    align-items : center;
    justify-content : space-between;
    padding : 10px 0;
    background-color: var(--slack-color);
    color : white;
 `;

const HeaderLeft = styled.div`
    display : flex;
    flex : 0.3;
    align-items : center; 
    margin-left : 20px;
    /* > .MuiSvgIcon-root {
        margin-left : auto;
        margin-right: 30px;
    } */
    >p{
        font-size: 15px;
        font-weight: 00
    }
`;

const HeaderAvatar = styled(Avatar)`
    cursor : pointer;
    :hover{
        opacity : 0.8
    }
`;

const HeaderSearch = styled.div`
    flex: 0.4;
    opacity : 1;
    border-radius : 6px; 
    background-color : #3c46e7;
    text-align : center;
    color: white;
    display : flex;
    padding : 0 50px;
    border : 1px gray solid;
    > input{
        background-color : transparent;
        border : none;
        text-align : center;
        min-width : 30vw;
        outline : 0;
        color : white;
    }
    >input::placeholder{
        color :white;
        font-weight: 600
    }
`;

const HeaderRight = styled.div`
    flex : 0.3;
    display :flex;
    align-items : flex-end;
    > .MuiSvgIcon-root {
        margin-right: 20px;
        margin-left: auto;
    }
`;