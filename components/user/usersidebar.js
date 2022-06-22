import React from "react";
import  Link  from "next/link";

const UserNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item font-bold my-6 text-xl">
        <Link href="/user/history" className="nav-link"><a >History</a> 
        </Link>
      </li>

      <li className="nav-item font-bold my-6 text-xl">
        <Link href="/user/password" className="nav-link"><a >Password</a> 
        </Link>
      </li>

      <li className="nav-item font-bold my-6 text-xl">
        <Link href="/user/wishlist" className="nav-link"><a >wishlist</a> 
        </Link>
      </li>
    </ul>
  </nav>
);

export default UserNav;