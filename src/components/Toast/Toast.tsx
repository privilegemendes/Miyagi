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

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

type Props = {
    variant: 'notice' | 'warning' | 'success' | 'error';
    children: React.ReactNode;
    onClose?: () => void;
}
const Toast: FC<Props> =
    (
        {
            variant = 'notice',
            children,
            onClose,
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

        return <ToastWrapper className={visible ? "show" : "hide"}>
            <ToastContainer className={variant}>
                <IconContainer className={variant}>
                    <Icon size={24}/>
                </IconContainer>
                <TextContainer>
                    {children}
                </TextContainer>
                <CloseButton onClick={onHandleClose || onClose}>
                    <X size={24}/>
                    <VisuallyHidden>Close</VisuallyHidden>
                </CloseButton>
            </ToastContainer>
        </ToastWrapper>;
;
}

export default Toast;

const ToastWrapper = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(-16px, 100%); /* start offscreen */
    transition: transform 0.4s ease-out; /* animate transform property */
    display: flex;
    align-items: center;
    gap: 16px;
    border-radius: 16px;
    color: black;
    color-scheme: light;
    background: white;
    max-width: 100%;
    width: 350px;
    
    @media (max-width: 768px) {
        top: 24px;
        bottom: auto;
    }

    &.show {
        transform: translate(-16px, -16px); /* slide up into view */
    }

    /* animate opacity when hiding */
    &.hide {
        opacity: 0;
        transition: opacity 0.2s ease-out;
    }

    /* keyframes to animate hiding */
    @keyframes slide-out {
        0% {
            transform: translate(-16px, -16px);
        }
        100% {
            transform: translate(-16px, 100%);
        }
    }

    /* animate sliding out when hiding */
    &.hide .close-button {
        animation: slide-out 0.2s ease-out;
    }
`;


const ToastContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 16px;
  color: black;
  color-scheme: light;
  background: white;
  max-width: 100%;
  width: 350px;

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

const TextContainer = styled.p`
  flex: 1;
  padding: 12px 0px;
  font-weight: 600;

`;

const CloseButton = styled.button`
  flex-shrink: 0;
  border: none;
  background: transparent;
  padding: 16px;
  cursor: pointer;
`;
