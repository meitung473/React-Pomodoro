import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useToggle from "@Hooks/useToggle";

import { Container, Navgation, Indicator, List } from "./Header.style";
import { ReactComponent as TaskIcon } from "@images/Task.svg";
import { ReactComponent as AlarmIcon } from "@images/Alarm.svg";
import { ReactComponent as AnalysisIcon } from "@images/Analysis.svg";
import pagedata from "./pages.json";

const pageIcon = [<TaskIcon />, <AlarmIcon />, <AnalysisIcon />];
const Pages = pagedata.data.map((el, i) =>
    Object.assign(el, { icon: pageIcon[i] })
);

function Header() {
    let location = useLocation();
    const { open, ToggleHandler } = useToggle();
    // const Pageindex = useMemo(
    //     () =>
    //         Object.values(Pages).findIndex(
    //             ({ name }) => "/" + name === location.pathname
    //         ),
    //     [location.pathname]
    // );

    return (
        <Navgation>
            <Container>
                {Pages.map(({ name, to, icon }) => (
                    <List
                        key={name}
                        onClick={() => ToggleHandler()}
                        $currentPage={location.pathname === "/" + name}
                    >
                        <Link to={open ? "/" : to}>{icon}</Link>
                    </List>
                ))}
            </Container>
            {/* <Indicator $index={Pageindex} /> */}
        </Navgation>
    );
}

export default Header;

Header.propTypes = {
    children: PropTypes.node,
};
