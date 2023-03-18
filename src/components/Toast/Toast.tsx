import * as React from 'react';
import styled from "styled-components";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';
import VisuallyHidden from "../VisuallyHidden";
import {FC, useEffect, useState} from "react";
import {Button3D} from "../atoms/Button3D";
import clsx from "clsx";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

type Props = {
    variant: 'notice' | 'warning' | 'success' | 'error';
    children: React.ReactNode;
    action?: string;
    onClose?: () => void;
    onClick?: (value?: any) => void;
    buttonType?: 'button' | 'form' | undefined;
    enableAction?: boolean;
}
const  Toast: FC<Props> =
    (
        {
            variant = 'notice',
            children,
            onClose,
            onClick,
            action,
            enableAction = false,
        }
    ) => {

  const Icon = ICONS_BY_VARIANT[variant];

        const [visible, setVisible] = useState(true);

        const onHandleClose = () => {
            setVisible(false);
            setTimeout(() => {
            }, 200); // wait for animation to complete before unmounting
        };

        useEffect(() => {
            // slide up into view when component is mounted
            setTimeout(() => {
            }, 500);
        }, []);

        return <ToastWrapper className={clsx(visible ? "show" : "hide", variant)}>
            <ToastContainer className={variant}>
                <IconContainer className={variant}>
                    <Icon size={24}/>
                </IconContainer>
                <ToastContent>
                    <TextContainer>
                        {children}
                    </TextContainer>
                </ToastContent>
                <CloseButton className={"close-button"} onClick={onHandleClose || onClose}>
                    <X size={24}/>
                    <VisuallyHidden>Close</VisuallyHidden>
                </CloseButton>
            </ToastContainer>
            {enableAction &&
            <Action>
                <Button3D
                    text={action}
                    onClick={onClick || onClose}
                />
            </Action>}
        </ToastWrapper>;
}

export default Toast;

const ToastWrapper = styled.div`
    grid-area: puzzle;
    position: absolute;
    top: 50%;
    left: 50%;
    bottom: auto;
    z-index: 2000;
    transform: translate(100%, -50%); /* start offscreen */
    transition: transform 0.4s ease-in-out; /* animate transform property */
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 16px;
    max-width: 350px;

    --color-notice: hsl(235deg 100% 50%);
    --color-notice-bg: hsl(235deg 0% 100%);
    --color-warning: hsl(35deg 100% 46%);
    --color-warning-bg: hsl(40deg 100% 94%);
    --color-success: hsl(120deg 80% 35%);
    --color-success-bg: hsl(120deg 90% 96%);
    --color-error: hsl(345deg 100% 50%);
    --color-error-bg: hsl(350deg 90% 96%);

    &.notice {
        background: var(--color-notice-bg);
    }
    &.notice .iconContainer {
        color: var(--color-notice);
    }
    &.warning {
        background: var(--color-warning-bg);
    }
    &.warning .iconContainer {
        color: var(--color-warning);
    }
    &.success {
        background: var(--color-success-bg);
    }
    &.success .iconContainer {
        color: var(--color-success);
    }
    &.error {
        background: var(--color-error-bg);
    }
    &.error .iconContainer {
        color: var(--color-error);
    }

    &.show {
        //transform: translate(-16px, -16px); /* slide up into view */
        transform: translate(-50%, -50%); /* slide left into view */
        
    }

    /* animate opacity when hiding */
    &.hide {
        opacity: 0;
        transition: opacity 0.2s ease-out;
    }

    /* keyframes to animate hiding */
    @keyframes slide-out {
        0% {
            transform: translate(-50%, -50%);
        }
        100% {
            transform: translate(100%, -50%);
        }
    }

    /* animate sliding out when hiding */
    &.hide .close-button {
        animation: slide-out 0.2s ease-out;
    }

    @media screen and (orientation: portrait) and (max-width: 768px) {
        width: 90%;
        top: 50%;
        left: 50%;
        bottom: auto;
        z-index: 2000;
        transform: translate(100%, -50%); /* start offscreen */

        &.show {
            transform: translate(-50%, -50%); /* slide left into view */
        }

        @keyframes slide-out {
            0% {
                transform: translate(-50%, -50%);
            }
            100% {
                transform: translate(100%, -50%);
            }
        }
    }
`;

const ToastContent = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    `;

const ToastContainer = styled.div`
    position: relative;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    gap: 16px;
    border-radius: 16px;
    color: black;
    max-width: 100%;
`;

const IconContainer = styled.div`
  flex-shrink: 0;
  padding: 16px 0 16px 16px;
  
  svg {
    display: block;
  }

  --color-notice: hsl(235deg 100% 50%);
  --color-notice-bg: hsl(235deg 0% 100%);
  --color-warning: hsl(35deg 100% 46%);
  --color-warning-bg: hsl(40deg 100% 94%);
  --color-success: hsl(120deg 80% 35%);
  --color-success-bg: hsl(120deg 90% 96%);
  --color-error: hsl(345deg 100% 50%);
  --color-error-bg: hsl(350deg 90% 96%);
  
  &.notice {
    color: var(--color-notice);
  }
  &.warning {
    color: var(--color-warning);
  }
  &.success {
    color: var(--color-success);
  }
  &.error {
    color: var(--color-error);
  }
`;

const TextContainer = styled.div`
    flex: 1;
    padding: 12px 0;
    font-weight: 600;
    text-align: center;
`;
const Action = styled.div`
    margin: 0;
    flex-direction: row;
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  border: none;
  background: transparent;
  padding: 16px;
  cursor: pointer;
`;
