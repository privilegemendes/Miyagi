import * as React from 'react';
import {FC} from 'react';
import styled from "styled-components";
import {
	AlertOctagon,
	AlertTriangle,
	CheckCircle,
	Info,
	X,
} from 'react-feather';
import {Button3D} from "../atoms/Button3D";

const ICONS_BY_VARIANT = {
	notice: Info,
	warning: AlertTriangle,
	success: CheckCircle,
	error: AlertOctagon,
	tutorial: Info,
};

type Props = {
    variant: 'notice' | 'warning' | 'success' | 'error' | 'tutorial';
    children: React.ReactNode;
    action?: string;
    onClose?: () => void;
    onClick?: (value?: any) => void;
    buttonType?: 'button' | 'form' | undefined;
    enableAction?: boolean;
    disableIcons?: boolean;
}
export const  Toast: FC<Props> =
    (
        {
            variant = 'notice',
            children,
            onClose,
            onClick,
            action,
            enableAction = false,
            disableIcons = false,
        }
    ) => {

  const Icon = ICONS_BY_VARIANT[variant];

        return <>
            <ToastNewWrapper className={variant}>
                <ToastContainer className={variant}>
                    <IconContainer className={variant}>
                        {!disableIcons &&
                            <Icon size={24}/>
                        }
                    </IconContainer>
                    <ToastContent>
                        <TextContainer>
                            {children}
                        </TextContainer>
                    </ToastContent>
                    <CloseButton className={"close-button"} onClick={onClose}>
                        {!disableIcons &&
                            <X size={24}/>
                        }
                    </CloseButton>
                </ToastContainer>
                {enableAction &&
                    <Action >
                        <Button3D
                            text={action}
                            onClick={onClick}
                            className={"close-button"}
                        />
                    </Action>}
            </ToastNewWrapper>
        </>

}

const ToastNewWrapper = styled.div`
    grid-area: puzzle;
    animation: slide-in 800ms cubic-bezier(0, 0.46, 0, 1.04) both;
    will-change: transform;
    position: absolute;
    top: 50%;
    left: 50%;
    bottom: auto;
    z-index: 2000;
    transform: translate(-50%, -50%); /* come to the center of the screen */
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 16px;
   	max-width: 350px;
    overflow: hidden !important;
  
  @media screen and (max-width: 768px) {
	
	width: 90%;
  }
    
    &.hide .close-button {
        animation: slide-out 800ms cubic-bezier(0, 0.46, 0, 1.04) both;
        will-change: transform;
    }

    @keyframes slide-in {
        from {
            transform: translate(100%, -50%);
        }
    }

	&.tutorial {
	background: var(--color-notice-bg);
	}
	&.tutorial .iconContainer {
	color: var(--color-notice);
	}
  
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

const ToastContainer = styled.div`
    position: relative;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    gap: 12px;
    border-radius: 16px;
    color: black;
    max-width: 100%;
    box-shadow:  0 0.3px 0.6px hsl(var(--shadow-color) / 0.2),
    0 0.7px 1.4px -1.1px hsl(var(--shadow-color) / 0.19),
    0 1.5px 3.7px -2.1px hsl(var(--shadow-color) / 0.18),
    0.1px 4px 9.2px -3.2px hsl(var(--shadow-color) / 0.17),
    0.2px 6px 15px -2.3px hsl(var(--shadow-color) / 0.16);
`;

const ToastContent = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    `;

const IconContainer = styled.div`
  flex-shrink: 0;
  padding: 16px 0 16px 16px;
  
  svg {
    display: block;
  }

  &.tutorial {
    color: var(--color-notice);
  }
  
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

  &.tutorial {
    overflow-y: auto !important;
	overflow-x: hidden !important;
    text-align: left;
    font-weight: 400;
  }
`;
const Action = styled.div`
    margin: 0;
    flex-direction: row;
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  padding: 16px 16px 16px 0;
  border: none;
  background: transparent;
  cursor: pointer;
`;
