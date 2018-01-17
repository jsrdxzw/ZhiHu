import {TabNavigator, StackNavigator, TabBarBottom} from 'react-navigation';
import {view as Home} from "../home";
import {view as User} from '../user';
import {view as Notification} from '../notification';
import {view as Chat} from '../chat';
import React from "react";
import {view as Welcome} from '../welcome';
import UserInfo from "../user/components/user-info";
import EditAvatarPage from "../user/components/editAvatar";
import EditNamePage from "../user/components/editName";
import EditGenderPage from "../user/components/editGender";
import EditSpecialityPage from "../user/components/editSpeciality";
import EditDescriptionPage from '../user/components/editDescription';
import MyQuestionList from "../user/components/myQuestionList";
import DetailQuestion from "../common-component/detailQuestion";
import SubComment from "../common-component/sub-comment";
import OtherUserPage from "../user/other-user/otherUserPage";
import CollectionQuestionList from "../user/components/collectionList";
import SubDetailCommentPage from "../common-component/sub-detail-comment-page";
import InviteAnswer from "../invite-answer/inviteAnswer";
import ChatDetailPage from "../chat/components/chat-detail-page";

const tabNavigator = TabNavigator({
    Home: {
        screen: Home
    },
    Chat:{
        screen:Chat
    },
    Notification:{
      screen:Notification
    },
    User: {
        screen: User
    }
}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false, //can swipe
    animationEnabled:false,
    tabBarOptions: {
        activeTintColor: '#1890ff'
    }
});


const RootNavigator = StackNavigator(
    {
        welcome:{
            screen:Welcome
        },
        tabView: {
            screen: tabNavigator,
        },
        userInfo:{ //个人基本信息修改
            screen:UserInfo
        },
        avatarPage:{ //个人头像修改
            screen:EditAvatarPage
        },
        namePage:{
            screen:EditNamePage
        },
        genderPage:{
            screen:EditGenderPage
        },
        specialityPage:{ //设置个人专长
            screen:EditSpecialityPage
        },
        descriptionPage:{
            screen:EditDescriptionPage
        },
        myQuestionListPage:{
            screen:MyQuestionList
        },
        collectionListPage:{
            screen:CollectionQuestionList
        },
        detailQuestionPage:{
            screen:DetailQuestion
        },
        subCommentPage:{
            screen:SubComment
        },
        otherUserPage:{
            screen:OtherUserPage
        },
        subDetailCommentPage:{
            screen:SubDetailCommentPage
        },
        inviteAnswerPage:{
            screen:InviteAnswer
        },
        ChatDetailPage:{
            screen:ChatDetailPage
        }
    }
);


export default RootNavigator


