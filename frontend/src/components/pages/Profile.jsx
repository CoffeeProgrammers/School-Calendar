import React from "react"
import "../../css/profile.css"

const Profile = () => {
    return (
        <div className="profile-container">
            <div className="profile-search">
                <input type="text" placeholder="Пошук користувачів" />
            </div>
            <div className="profile-information">
                <div className="user-photo-name">
                    <div className="user-photo">
                    </div>
                    <div className="user-name">Sophia Miller</div>
                </div>
                <table className="user-information">
                    <tr>
                        <td>birtday:</td>
                        <td>14.06.2011</td>
                    </tr>
                    <tr>
                        <td>email:</td>
                        <td>user00001@gmail.com</td>
                    </tr>
                    <tr>
                        <td>number:</td>
                        <td>+38066666666</td>
                    </tr>
                </table>
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