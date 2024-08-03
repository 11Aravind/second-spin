import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Profile = () => {
	const [isEnabled, setEnabled] = useState(false);
	const navigate = useNavigate(); // For navigation after logout

	const handleLogout = () => {
		localStorage.removeItem('userId');
		toast.success("Logout Successfully", {
			position: 'top-right',
			autoClose: 3000,
			onClose: () => navigate('/login') // Redirect after toast is closed
		});
	};

	return (
		<div className="container">
			<ToastContainer />
			<div className="main-body">
				<div className="row">
					<div className="col-lg-3">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center text-center">
									<img
										src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
										alt="Admin"
										className="rounded-circle p-1"
										style={{ width: "50px", height: "50px", background: "#fff" }}
									/>
									<div className="mt-3" style={{ marginLeft: "24px" }}>
										<p className="text-muted font-size-sm">Hello,
											<h6>Aravind</h6>
										</p>
									</div>
								</div>
								<hr className="my-3" />
								<ul className="list-group list-group-flush">

									{localStorage.getItem('userId') ? (<>
										<Link to="/orders">
											<li className="pding d-flex justify-content-between align-items-center flex-wrap">
												<h6 className="mb-0">My Orders</h6>
												<span className="text-secondary"><i className="bi bi-chevron-right"></i></span>
											</li>
										</Link>
										<li className="pding d-flex justify-content-between align-items-center flex-wrap">
											<h6 className="mb-0">Manage Address</h6>
											<span className="text-secondary"><i className="bi bi-chevron-right"></i></span>
										</li>
										<li className="pding d-flex justify-content-between align-items-center flex-wrap" style={{ cursor: "pointer" }} onClick={handleLogout}>
											<h6 className="mb-0 d-flex" style={{ gap: "12px" }} >
												<i className="bi bi-power" style={{ color: "red" }}></i> Logout
											</h6>
										</li>
									</>) : (
										<li className="pding d-flex justify-content-between align-items-center flex-wrap">
											<h6 className="mb-0"><Link to="/login">login / signup</Link></h6>
										</li>
									)}
								</ul>
							</div>
						</div>
					</div>
					<div className="col-lg-8">
						<div className="card">
							<div className="card-body">
								<div className='d-flex'>
									<h5>Personal Informations</h5>
									<span className="edit" onClick={() => setEnabled(!isEnabled)}>Edit</span>
								</div>
								<div className="row mb-3">
									<div className="col-sm-6">
										<input type="text" className="form-control" value="" disabled={!isEnabled} />
									</div>
									<div className="col-sm-6 text-secondary">
										<input type="text" className="form-control" value="AS" disabled={!isEnabled} />
									</div>
								</div>
								<div className="row mb-3">
									<div className="col-sm-6">
										<input type="email" className="form-control" value="aravind@gmail.com" disabled={!isEnabled} />
									</div>
									<div className="col-sm-6 text-secondary">
										<input type="text" className="form-control" value="+918848310248" disabled={!isEnabled} />
									</div>
								</div>
								<div className="row">
									<div className="col-sm-3"></div>
									<div className="col-sm-9 text-secondary">
										<input type="button" className="btn btn-primary px-4" value="Save Changes" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
