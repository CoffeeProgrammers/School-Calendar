import React from "react"
import "../../assets/css/profile.css"
import PersonIcon from '@mui/icons-material/Person';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';

const Profile = () => {
    return (
        <Box className="profile-container">
            <Box className="profile-information">
                <Box className="user-photo">
                    <PersonIcon className="user-photo-icon" sx={{ fontSize: 250 }} />
                </Box>
                <Box className="user-name">
                    <Typography variant="h4" mb={2}>Sophia Miller</Typography>
                </Box>
                <table className="user-information">
                    <tr>
                        <td>
                            <Typography variant="p">birthday:</Typography>
                        </td>
                        <td>
                            <Typography variant="p">14.06.2011</Typography>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Typography variant="p">email:</Typography>
                        </td>
                        <td>
                            <Typography variant="p">user00001@gmail.com</Typography>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Typography variant="p">number:</Typography>
                        </td>
                        <td>
                            <Typography variant="p">+3806666666</Typography>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Typography variant="p">adress:</Typography>
                        </td>
                        <td>
                            <Typography variant="p">street 5A</Typography>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Typography variant="p">class:</Typography>
                        </td>
                        <td>
                            <Typography variant="p" >11B</Typography>
                        </td>
                    </tr>
                </table>
                <Box className="user-description">
                    <Typography variant="p" mt={2}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit enim quibusdam similique, molestiae cupiditate eius dolores repudiandae, voluptatem dolor culpa blanditiis ab obcaecati porro architecto dignissimos sunt placeat alias atque?</Typography>
                </Box>
            </Box>
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
        </Box>
    )
}

export default Profile