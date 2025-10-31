import React from "react";
import { Link } from 'react-router-dom';
import { Disclosure, DisclosurePanel, DisclosureButton } from "@headlessui/react";
import RecentReviewsContainer from "../containers/RecentReviewsContainer";
import RecentOrdersContainer from "../containers/RecentOrdersContainer";
import '../../styles/ProfilePage.css'

function ProfilePage({ user }) {

    return (
        <div className="profile-page">
            <h1>Welcome {user.email}</h1>
            <ul className="links">
                <li><Link to="/review" className="cta">Leave a review!</Link></li>
                <li><Link to="/order" className="cta">Make an order!</Link></li>
            </ul>

            <div className="profile-page-inner-wrapper">
                <section>
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <DisclosureButton style={{ columnGap: "10px", borderRadius: "10px", fontFamily: "inherit", width: '100%', padding: '10px 15px', backgroundColor: '#8D6E63', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3>Here are all of the orders you've ever made</h3>
                                    <span>{open ? '▲' : '▼'}</span>
                                </DisclosureButton>
                                <DisclosurePanel>
                                    <RecentOrdersContainer user={user}/>
                                </DisclosurePanel>
                            </>
                        )}
                    </Disclosure>
                </section>

                <section>

                    <Disclosure>
                        {({ open }) => (
                            <>
                                <DisclosureButton style={{ columnGap: "10px", borderRadius: "10px", fontFamily: "inherit", width: '100%', padding: '10px 15px', backgroundColor: '#8D6E63', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3>Here are all of the reviews you've ever made</h3>
                                    <span>{open ? '▲' : '▼'}</span>
                                </DisclosureButton>
                                <DisclosurePanel>
                                    <RecentReviewsContainer user={user}/>
                                </DisclosurePanel>
                            </>
                        )}
                    </Disclosure>
                </section>
            </div>


        </div>

    );
}

export default ProfilePage;