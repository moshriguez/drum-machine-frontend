import React from "react";

const MyProfileContainer = () => {
    const user = useSelector(state => state.user)

    return (
        <div className="my-profile-container">
            <p>profile container</p>
        </div>
    )
}

export default MyProfileContainer