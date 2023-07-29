import React from 'react';
import './UserCard.css';

const UserCard = ({ user, handleUserSelect }) => {
    const { first_name, last_name, email, avatar, domain, available } = user;

    return (
        <div className="col-md-4 col-sm-6 col-lg-3 mb-4 mt-4">
            <div className="card shadow">
                <img src={avatar} alt={`${first_name} ${last_name}`} className="card-img-top user-avatar" />
                <div className="card-body">
                    <h5 className="card-title">{`${first_name} ${last_name}`}</h5>
                    <p className="card-text">{email}</p>
                    <p className="card-text">{domain}</p>
                    <p className="card-text">Availability: {available ? 'Available' : 'Not Available'}</p>
                    <button className="btn btn-primary" onClick={() => handleUserSelect(user)}>
                        Add to Team
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
