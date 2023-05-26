import { useLogout } from "../hooks/useLogout";

export default function NavbarOption() {
  const { logout, isPending } = useLogout();

  return (
    <div className="navbar-option">
      <button className="action">
        <i className="fi fi-ss-bell"></i>
      </button>
      {!isPending && (
        <button className="action" onClick={logout}>
          <i className="fi fi-br-sign-out-alt"></i>
        </button>
      )}
      {isPending && (
        <button className="action" disabled>
          <i className="fi fi-rr-menu-dots"></i>
        </button>
      )}
    </div>
  );
}
