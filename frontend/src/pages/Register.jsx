import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import userService from "../services/userService";
import BackAndLogout from "../components/BackAndLogout";
import "../utils/Register.css";


const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "student",
    student_number: "",
    major: "",
    year_of_study: "",
    graduation_year: "",
    university: "",
    company: "",
    position: "",
    industry: "",
    years_of_experience: "",
    is_available_for_mentorship: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const r = params.get("role");
    if (r === "alumni" || r === "student") {
      setFormData((prev) => ({ ...prev, role: r }));
    }
  }, [location]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onCheckboxChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.checked });

  const toggleRole = () =>
    setFormData((prev) => ({
      ...prev,
      role: prev.role === "student" ? "alumni" : "student",
      student_number: "",
      major: "",
      year_of_study: "",
      graduation_year: "",
      university: "",
      company: "",
      position: "",
      industry: "",
      years_of_experience: "",
      is_available_for_mentorship: false,
    }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { first_name, last_name, email, password, role, student_number, company } = formData;

    if (!first_name || !last_name || !email || !password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (role === "student" && !student_number) {
      setError("Student number is required");
      setLoading(false);
      return;
    }

    if (role === "alumni" && !company) {
      setError("Company is required");
      setLoading(false);
      return;
    }

    try {
      const res = await userService.register(formData);
      login(res.user, res.user.role);

      navigate(
        res.user.role === "student"
          ? "/linkedin-dashboard"
          : "/alumni-linkedin-dashboard"
      );
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };

  const {
    first_name,
    last_name,
    email,
    password,
    role,
    student_number,
    major,
    year_of_study,
    graduation_year,
    university,
    company,
    position,
    industry,
    years_of_experience,
    is_available_for_mentorship,
  } = formData;

  return (
    <div className="form-master-container">
      <BackAndLogout showLogout={false} />

      <div className="form-card">
        <h2 className="form-title">Create Your Account</h2>

        <div className="role-switch-box">
          <button type="button" className="role-switch-btn" onClick={toggleRole}>
            Switch to {role === "student" ? "Alumni" : "Student"}
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={onSubmit}>
          {/* First + Last Name */}
          <div className="grid-2">
            <div className="form-group">
              <input
                type="text"
                name="first_name"
                className="form-input"
                placeholder=" "
                value={first_name}
                onChange={onChange}
              />
              <label className="form-label">First Name *</label>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="last_name"
                className="form-input"
                placeholder=" "
                value={last_name}
                onChange={onChange}
              />
              <label className="form-label">Last Name *</label>
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder=" "
              value={email}
              onChange={onChange}
            />
            <label className="form-label">Email Address *</label>
          </div>

          {/* Password */}
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder=" "
              value={password}
              onChange={onChange}
            />
            <label className="form-label">Password *</label>
          </div>

          {/* Student Fields */}
          {role === "student" && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  name="student_number"
                  className="form-input"
                  placeholder=" "
                  value={student_number}
                  onChange={onChange}
                />
                <label className="form-label">Student Number *</label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="major"
                  className="form-input"
                  placeholder=" "
                  value={major}
                  onChange={onChange}
                />
                <label className="form-label">Major</label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="university"
                  className="form-input"
                  placeholder=" "
                  value={university}
                  onChange={onChange}
                />
                <label className="form-label">University</label>
              </div>

              <div className="form-group">
                <select
                  name="year_of_study"
                  className="form-input"
                  value={year_of_study}
                  onChange={onChange}
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
                <label className="form-label">Year of Study</label>
              </div>

              <div className="form-group">
                <input
                  type="number"
                  name="graduation_year"
                  className="form-input"
                  placeholder=" "
                  value={graduation_year}
                  onChange={onChange}
                />
                <label className="form-label">Graduation Year</label>
              </div>
            </>
          )}

          {/* Alumni Fields */}
          {role === "alumni" && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  name="company"
                  className="form-input"
                  placeholder=" "
                  value={company}
                  onChange={onChange}
                />
                <label className="form-label">Company *</label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="position"
                  className="form-input"
                  placeholder=" "
                  value={position}
                  onChange={onChange}
                />
                <label className="form-label">Position</label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="industry"
                  className="form-input"
                  placeholder=" "
                  value={industry}
                  onChange={onChange}
                />
                <label className="form-label">Industry</label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="university"
                  className="form-input"
                  placeholder=" "
                  value={university}
                  onChange={onChange}
                />
                <label className="form-label">University</label>
              </div>

              <div className="form-group">
                <input
                  type="number"
                  name="graduation_year"
                  className="form-input"
                  placeholder=" "
                  value={graduation_year}
                  onChange={onChange}
                />
                <label className="form-label">Graduation Year</label>
              </div>

              <div className="form-group">
                <input
                  type="number"
                  name="years_of_experience"
                  className="form-input"
                  placeholder=" "
                  value={years_of_experience}
                  onChange={onChange}
                />
                <label className="form-label">Years of Experience</label>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="is_available_for_mentorship"
                    checked={is_available_for_mentorship}
                    onChange={onCheckboxChange}
                  />
                  Available for Mentorship
                </label>
              </div>
            </>
          )}

          <button className="btn-primary" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to={`/login?role=${role}`}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
