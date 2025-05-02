import React from "react"
import "../../css/profile.css"
import PersonIcon from '@mui/icons-material/Person';
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
                        <PersonIcon className="user-photo-icon" sx={{ fontSize: 250 }} />
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

            <table className="profile-calendar">
                <thead>
                    <tr>
                        <td colSpan={7}>
                            <p>March</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Monday</td>
                        <td>Tuesday</td>
                        <td>Wednesday</td>
                        <td>Thursday</td>
                        <td>Friday</td>
                        <td>Saturday</td>
                        <td>Sunday</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>10</td>
                        <td>11</td>
                        <td>12</td>
                        <td>13</td>
                        <td>14</td>
                        <td>15</td>
                    </tr>
                    <tr>
                        <td>16</td>
                        <td>17</td>
                        <td>18</td>
                        <td>19</td>
                        <td>20</td>
                        <td>21</td>
                        <td>22</td>
                    </tr>
                    <tr>
                        <td>23</td>
                        <td>24</td>
                        <td>25</td>
                        <td className="active-date">26</td>
                        <td>27</td>
                        <td>28</td>
                        <td>29</td>
                    </tr>
                    <tr>
                        <td>30</td>
                        <td>31</td>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Profile