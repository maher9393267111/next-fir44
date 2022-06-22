import React from "react";
import Link from "next/link";

const AdminNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item font-bold my-6 text-xl">
        <Link href="/admin/dashboard" className="nav-link">
          <a>Admin Dashboard</a>
        </Link>
      </li>

      <li className="nav-item font-bold my-6 text-xl">
        <Link href="/admin/product" className="nav-link">
          <a>Product</a>
        </Link>
      </li>

      <li className="nav-item font-bold my-6 text-xl">
        <Link href="/admin/category" className="nav-link">
          <a>Category</a>
        </Link>
      </li>

      <li className="nav-item font-bold my-6 text-xl">
        <Link href="/admin/sub" className="nav-link">
          <a>Sub-Category</a>
        </Link>
      </li>

      <li className="nav-item font-bold my-6 text-xl">
        <Link href="/admin/cuopon" className="nav-link">
          <a>Cuopon</a>
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
