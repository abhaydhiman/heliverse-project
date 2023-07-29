import React from 'react';

const TeamMemberCard = ({ member }) => {
    const { first_name, last_name, email, avatar, domain, available } = member;

    return (
        <div className="col mb-4 mt-4">
            <div className="card shadow">
                <img src={avatar} alt={`${first_name} ${last_name}`} className="card-img-top user-avatar" />
                <div className="card-body">
                    <h5 className="card-title">{`${first_name} ${last_name}`}</h5>
                    <p className="card-text">{email}</p>
                    <p className="card-text">{domain}</p>
                    <p className="card-text">Availability: {available ? 'Available' : 'Not Available'}</p>
                </div>
            </div>
        </div>
    );
};

export default TeamMemberCard;
