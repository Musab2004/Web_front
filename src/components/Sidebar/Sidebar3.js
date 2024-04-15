/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
	const classes = useStyles();
	// verifies if routeName is the one active (in browser input)
	function activeRoute(routeName) {
		return window.location.href.indexOf(routeName) > -1 ? true : false;
	}
	const { color, logo, image, logoText, routes } = props;
	var links = (
		<ul className='menu flex flex-col p-4 pt-0 compact'>
			{/* <li class="mt-4 menu-title">
        <span>
            Users
        </span>
    </li> */}
			{routes.map((prop, key) => {
				let listItemClasses = classNames({
					["capitalize " + 'active nuxt-link-active']: activeRoute(prop.layout + prop.path)
				});
				return (

					<li className='my-2' >
						<NavLink
							to={prop.layout + prop.path}
							className={listItemClasses}
							// activeClassName="active nuxt-link-active"
							key={key}
						>
							{typeof prop.icon === "string" ? (
								<Icon
									className={'inline-block mr-2 stroke-current capitalize'}
								>
									{prop.icon}
								</Icon>
							) : (
								<prop.icon
									className={'inline-block mr-2 stroke-current capitalize'}
								/>
							)}
							{prop.name}
						</NavLink>
					</li>
				);
			})}
		</ul>
	);
	var brand = (
		<div
			class="sticky inset-x-0 top-0 z-50 hidden w-full py-1 transition duration-200 ease-in-out border-b lg:block border-base-200 bg-base-100">
			<div class="mx-auto items-center align-center text-center self-center  space-x-1 navbar max-w-none">
				<div class="flex items-center flex-none">
					<div class="avatar">
						<div class="rounded-btn contain w-1/3">
							<img src={logo} className='contain w-full' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);


	return (
		<div class="drawer-side"><label for="main-menu" class="drawer-overlay"></label>
			<aside class="flex flex-col justify-between border-r border-base-200 bg-base-100 text-base-content w-80">
				{brand}
				<div>
					{links}
				</div>
			</aside>
		</div>
	);
}

Sidebar.propTypes = {
	rtlActive: PropTypes.bool,
	handleDrawerToggle: PropTypes.func,
	bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
	logo: PropTypes.string,
	image: PropTypes.string,
	logoText: PropTypes.string,
	routes: PropTypes.arrayOf(PropTypes.object),
	open: PropTypes.bool
};
