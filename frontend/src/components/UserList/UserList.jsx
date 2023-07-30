import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../redux/actions';
import { fetchDomainOptions } from '../../redux/domainActions';
import { createTeam } from '../../redux/teamActions'
import UserCard from '../UserCard/UserCard';
import TeamMemberCard from '../TeamCard/TeamCard';
import { Modal, Button } from 'react-bootstrap';
import './UserList.css';

const UserList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedAvailability, setSelectedAvailability] = useState('');
    const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);

    const { users, totalUsers, totalPages, loading, error } = useSelector((state) => state.users);
    const { domainOptions } = useSelector((state) => state.domain);

    useEffect(() => {
        dispatch(
            fetchUsers({
                page: currentPage,
                limit: 20,
                search: searchQuery,
                domain: selectedDomain,
                gender: selectedGender,
                available: selectedAvailability,
            })
        );
        dispatch(fetchDomainOptions());
    }, [dispatch, currentPage, searchQuery, selectedDomain, selectedGender, selectedAvailability]);

    const handlePageChange = (e) => {
        const newPage = parseInt(e.target.value);
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.trim());
    };

    const handleDomainChange = (e) => {
        setSelectedDomain(e.target.value);
    };

    const handleGenderChange = (e) => {
        setSelectedGender(e.target.value);
    };

    const handleAvailabilityChange = (e) => {
        setSelectedAvailability(e.target.value);
    };

    const renderUserCards = () => {
        return users.map((user) => <UserCard key={user._id} user={user} handleUserSelect={handleUserSelect} />);
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        return (
            <div className="pagination d-flex justify-content-center">
                <button className="btn btn-primary page-nav" onClick={handlePrevPage}>
                    Prev
                </button>
                <div className="form-group mx-2">
                    <input
                        type="number"
                        className="form-control page-input"
                        value={currentPage}
                        onChange={handlePageChange}
                        min={1}
                        max={totalPages}
                    />
                </div>
                <span className="page-total align-self-center">of {totalPages}</span>
                <button className="btn btn-primary page-nav mx-2" onClick={handleNextPage}>
                    Next
                </button>
            </div>

        );
    };

    const renderSelectedTeamMembers = () => {
        return selectedTeamMembers.map((member) => (
            <TeamMemberCard key={member._id} member={member} />
        ));
    };

    const handleUserSelect = (user) => {
        const isUniqueDomain = selectedTeamMembers.every(
            (member) => member.domain !== user.domain
        );

        const isAvailable = user.available;

        if (isUniqueDomain && isAvailable) {
            setSelectedTeamMembers((prevMembers) => [...prevMembers, user]);
        } else if (!isAvailable) {
            alert('This user is not available and cannot be added to the team.');
        } else {
            alert('This user has the same domain as an existing team member and cannot be added to the team.');
        }
    };

    const handleCreateTeam = () => {
        try {
            const selectedUserIds = selectedTeamMembers.map((user) => user.id);
            dispatch(createTeam(selectedUserIds));
            setSelectedTeamMembers([]);
            setShowModal(true);
        } catch (error) {
            console.log("Error Message: ", error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <div className="selected-team-members">
                        {selectedTeamMembers.length > 0 ? (
                            <>
                                <h3>Selected Team Members:</h3>
                                {renderSelectedTeamMembers()}
                                <div className="text-center">
                                    <Button className="create-team-button" onClick={handleCreateTeam}>
                                        Create Team
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <p>No team members selected. Add members to the team.</p>
                        )}
                    </div>
                </div>

                <div className="col-md-9">
                    <div className="user-list">
                        <h1>Users</h1>
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <div style={{ padding: '5px', flex: '1 1 300px' }}>
                                <label>Filter by Domain:</label>
                                <select value={selectedDomain} onChange={handleDomainChange}>
                                    <option value="">All</option>
                                    {domainOptions.map((domainOption) => (
                                        <option key={domainOption} value={domainOption}>
                                            {domainOption}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ padding: '5px', flex: '1 1 300px' }}>
                                <label>Filter by Gender:</label>
                                <select value={selectedGender} onChange={handleGenderChange}>
                                    <option value="">All</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div style={{ padding: '5px', flex: '1 1 300px' }}>
                                <label>Filter by Availability:</label>
                                <select value={selectedAvailability} onChange={handleAvailabilityChange}>
                                    <option value="">All</option>
                                    <option value="true">Available</option>
                                    <option value="false">Not Available</option>
                                </select>
                            </div>
                        </div>
                        <div className="user-cards-container row">{renderUserCards()}</div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : (
                            renderPagination()
                        )}
                    </div>
                </div>
                <div className="view-team-button">
                    <button className="btn btn-primary" onClick={() => navigate('/team')}>
                        View Team
                    </button>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Team Created Successfully</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your team has been created successfully!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserList;
