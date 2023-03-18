import * as React from "react";
import {PrimaryButton} from "../Button";
import {Link, useHistory} from "react-router-dom";
import styled from "styled-components";
import {useEffect} from "react";
import {NavButtonStyleProps, SVGProps} from "../../../types/types";


export const SettingsButton: React.FC<SVGProps> =
    (
        {
            text="Settings",
            height = "45px",
            width = "45px",
            onClick
        }
    ) => {

        const [activeRouteColor, setActiveRouteColor] = React.useState<string>('#ffffff');


        const history = useHistory();
        useEffect(() => {
            if (history.location.pathname === '/settings') {
                setActiveRouteColor('#08a0ff');
            }
        }, [history]);

        return <SettingsButtonContainer activeRouteColor={activeRouteColor}>
            <Link to={'/settings'}>
                <PrimaryButton
                    aria-label={text}
                    onClick={onClick}
                >
                    <svg fill={activeRouteColor} height={height} width={width} viewBox="0 0 1920 1920">
                        <path d="m1739.34 1293.414-105.827 180.818-240.225-80.188-24.509 22.25c-69.91 63.586-150.211 109.666-238.644 136.771l-32.076 9.94-49.468 244.065H835.584l-49.468-244.179-32.076-9.939c-88.432-27.105-168.734-73.185-238.644-136.771l-24.508-22.25-240.226 80.189-105.826-180.82 189.74-164.442-7.453-32.978c-10.39-45.742-15.586-91.483-15.586-135.869 0-44.386 5.195-90.127 15.586-135.868l7.454-32.979-189.741-164.442 105.826-180.819 240.226 80.075 24.508-22.25c69.91-63.585 150.212-109.665 238.644-136.884l32.076-9.826 49.468-244.066h213.007l49.468 244.18 32.076 9.825c88.433 27.219 168.734 73.186 238.644 136.885l24.509 22.25 240.225-80.189 105.826 180.819-189.74 164.442 7.453 32.98c10.39 45.74 15.586 91.481 15.586 135.867 0 44.386-5.195 90.127-15.586 135.869l-7.454 32.978 189.741 164.556Zm-53.76-333.403c0-41.788-3.84-84.48-11.634-127.284l210.184-182.062-199.454-340.856-265.186 88.433c-66.974-55.567-143.322-99.388-223.85-128.414L1140.977.01H743.198l-54.663 269.704c-81.431 29.139-156.424 72.282-223.963 128.414L199.5 309.809.045 650.665l210.07 182.062c-7.68 42.804-11.52 85.496-11.52 127.284 0 41.789 3.84 84.48 11.52 127.172L.046 1269.357 199.5 1610.214l265.186-88.546c66.974 55.68 143.323 99.388 223.85 128.527l54.663 269.816h397.779l54.663-269.703c81.318-29.252 156.424-72.283 223.85-128.527l265.186 88.546 199.454-340.857-210.184-182.174c7.793-42.805 11.633-85.496 11.633-127.285ZM942.075 564.706C724.1 564.706 546.782 742.024 546.782 960c0 217.976 177.318 395.294 395.294 395.294 217.977 0 395.294-177.318 395.294-395.294 0-217.976-177.317-395.294-395.294-395.294m0 677.647c-155.633 0-282.353-126.72-282.353-282.353s126.72-282.353 282.353-282.353S1224.43 804.367 1224.43 960s-126.72 282.353-282.353 282.353" fillRule="evenodd"/>
                    </svg>
                </PrimaryButton>
            </Link>
            <h1>Settings</h1>
        </SettingsButtonContainer>


}

const SettingsButtonContainer = styled.div<NavButtonStyleProps>`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: ${props => props.activeRouteColor};
        transition: color 0.1s ease-in-out;
        & > h1 {
            color: ${props => props.activeRouteColor};
        }
`;
