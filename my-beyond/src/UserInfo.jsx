import React, {useEffect, useState} from 'react'
import { FaExternalLinkAlt } from "react-icons/fa";
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';


export const UserInfo = ({ gitUser, searched, userNotFound }) => {
    const [componentVisible, setComponentVisible] = useState(false);

    useEffect(() => {
        // Show the component after the search is performed
        setComponentVisible(true);
    }, []);
    return (
        <>
        {componentVisible && searched && userNotFound ? (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "50px"}}>
                    <div className='main-user'>
                        <div>
                            <div>
                                <img src={gitUser.avatar_url} alt="" className='user-img'/>
                            </div>
                            <div style={{marginTop: "20px"}}>
                                <h5>Joined: {gitUser.created_at}</h5>
                                <button style={{display: "flex",alignItems: "center", width: "100px", justifyContent: "center", marginTop: "10px", height: "50px"}}><a href={gitUser.html_url} target='_blank'>Visit <FaExternalLinkAlt size={15}/></a></button>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', flex: "1", marginLeft: "15px"}} className='batman'>
                            <div style={{display: 'flex', justifyContent: 'space-between'}} className='son'>
                                <div>
                                    <h1>{gitUser.login}</h1>
                                </div>
                                <div>
                                    {gitUser.location ? <h1>{gitUser.location}</h1> : <h1>Unknown</h1>}
                                </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: "space-between"}} className='son'>
                                <div>
                                    <h1>Followers: {gitUser.followers}</h1>
                                </div>
                                <div>
                                    <h1>Following: {gitUser.following}</h1>
                                </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between'}} className='son'>
                                <div>
                                    {gitUser.name ? <h1>{gitUser.name}</h1> : <h1>No name</h1>}
                                </div>
                                <div>
                                    <h1>Repos: {gitUser.public_repos}</h1>
                                </div>
                            </div>
                            <div className='son' style={{marginLeft: "20px"}}>
                                {gitUser.bio ? <h1>{gitUser.bio}</h1> : <h1>No bio</h1>}
                            </div>
                        </div>
                    </div>
                </div>
        ) : null}
        </>
    )
}