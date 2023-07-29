import React from 'react';
import { useSelector } from 'react-redux';
import TeamMemberCard from '../TeamCard/TeamCard';

const TeamPage = () => {
    const { team } = useSelector((state) => state.team);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Team</h1>
                    {team?.length > 0 ? (
                        <div className="row team-cards-container">
                            {team.members.map((member) => (
                                <TeamMemberCard key={member._id} member={member} />
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
