'use client';

import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';

export default function SideBar() {
  return (
    <Sidebar className='w-500px' aria-label="Sidebar with logo branding example">
      <Sidebar.Logo
        href="#"
        img="images/logo.svg"
        imgAlt="Flowbite logo"
      >
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="#"
            icon={HiChartPie}
          >
            <p>
              Dashboard
            </p>
          </Sidebar.Item>
          <Sidebar.Item
            href={route('dashboard.show.article')}
            icon={HiViewBoards}
          >
            <p>
              Articles
            </p>
          </Sidebar.Item>
          <Sidebar.Collapse
            icon={HiShoppingBag}
            label="E-commerce"
          >
            <Sidebar.Item href="#">
              Products
            </Sidebar.Item>
            <Sidebar.Item href="#">
              Sales
            </Sidebar.Item>
            <Sidebar.Item href="#">
              Refunds
            </Sidebar.Item>
            <Sidebar.Item href="#">
              Shipping
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item
            href="#"
            icon={HiInbox}
          >
            <p>
              Inbox
            </p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiUser}
          >
            <p>
              Users
            </p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiShoppingBag}
          >
            <p>
              Products
            </p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiArrowSmRight}
          >
            <p>
              Sign In
            </p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiTable}
          >
            <p>
              Sign Up
            </p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}


