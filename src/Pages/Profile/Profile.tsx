import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";


const Profile = () => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  const cardsOpened = 25;

  if (!user) return <p>Loading...</p>;

  const { name, phone, email, image, address, isAdmin, isBusiness } = user;

  return (
    <div style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#f5f5f5", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Profile Page</h1>

      <div style={{ maxWidth: "600px", margin: "0 auto 20px", padding: "20px", backgroundColor: "white", borderRadius: "8px", justifyContent: 'center', display: 'block' }}>
        <img
          src={image.url}
          alt={image.alt || "User Avatar"}
          style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover", marginBottom: "20px", border: "4px solid green" }}
        />

        <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
          {name.first} {name.middle} {name.last}
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <p> {email}</p>
          <p> {phone}</p>
          <p> {`${address.street} ${address.houseNumber}, ${address.city}, ${address.state}, ${address.country} - ${address.zip}`}</p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Account Details</h3>
          <p>Role: {isAdmin ? "Administrator" : "Regular User"}</p>
          <p>Account Type: {isBusiness ? "Business" : "Personal"}</p>
        </div>

        <div>
          <h3>User Stats</h3>
          <p> Cards Opened: {cardsOpened}</p>
          <p> Active Since: {new Date().getFullYear() - 1} Year</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
