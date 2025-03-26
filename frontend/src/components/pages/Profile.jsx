import React from "react"
import "../../css/profile.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';

const Profile = () => {
    return (
        <div className="profile-container">
            <div className="profile-search">
                <input type="text" placeholder="Пошук користувачів" />
                <SearchIcon className="search-icon" />
            </div>
            <div className="profile-information">
                <div className="user-photo-name">
                    <div className="user-photo">
                        <AccountCircleIcon className="user-photo-icon" />
                        <button className="edit-userPhoto"><CreateIcon></CreateIcon></button>
                    </div>
                    <div className="user-name">
                        <h2>Sophia Miller</h2>
                        <CreateIcon className="edit-userName"></CreateIcon>
                    </div>
                    <div className="user-description">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit enim quibusdam similique, molestiae cupiditate eius dolores repudiandae, voluptatem dolor culpa blanditiis ab obcaecati porro architecto dignissimos sunt placeat alias atque?</p>
                        <CreateIcon className="edit-userDescription"></CreateIcon>
                    </div>
                </div>
                <table className="user-information">
                    <tr>
                        <td>birthday:</td>
                        <td>
                            <p>14.06.2011</p>
                        </td>
                    </tr>
                    <tr>
                        <td>email:</td>
                        <td>
                            <p>user00001@gmail.com</p>
                        </td>
                    </tr>
                    <tr>
                        <td>number:</td>
                        <td>
                            <p>+3806666666</p>
                        </td>
                    </tr>
                    <tr>
                        <td>adress:</td>
                        <td>
                            <p>street 5A</p>
                        </td>
                    </tr>
                    <tr>
                        <td>class:</td>
                        <td><p>11B</p></td>
                    </tr>
                </table>
                <button className="user-information-edit">edit</button>
            </div>
            <div className="profile-calendar">
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
                <div className="calendar-elem"></div>
            </div>
        </div>
    )
}

export default Profile