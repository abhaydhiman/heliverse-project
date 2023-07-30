import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import TeamMemberCard from '../TeamCard/TeamCard';
import { fetchUsers } from '../../redux/actions';

const TeamPage = () => {
    const { team } = useSelector((state) => (state.team));
    const [teamMembersWithInfo, setTeamMembersWithInfo] = useState([]);

    useEffect(() => {
        if (team && team.members) {
            const userIds = team.members.map((member) => member);
            
            Promise.all(userIds.map((userId) => fetchUserInfo(userId)))
                .then((userInfos) => {
                    const updatedTeamMembers = team.members.map((member, index) => ({
                        ...member,
                        userInfo: userInfos[index]
                    }));
                    setTeamMembersWithInfo(updatedTeamMembers);
                    console.log("updated team members: ", updatedTeamMembers);
                })
                .catch((error) => {
                    console.log('Error fetching user data:', error);
                });
        }
    }, [team]);


    const fetchUserInfo = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log('Error fetching user info:', error);
            return null;
        }
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Team</h1>
                    {teamMembersWithInfo?.length > 0 ? (
                        <div className="row team-cards-container">
                            {teamMembersWithInfo.map((member) => (
                                <div className='col-lg-3 col-md-4 col-sm-6'>
                                <TeamMemberCard key={member.userInfo.id} member={member.userInfo} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No team members found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamPage;
