import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { email } from '@/configs';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.palette.primary};
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    margin-top: 50px;
  }
`;

function ContactSection() {
  const revealContainer = useRef(null);
  const { sr, srConfig } = useScrollReveal();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);
  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What&apos;s Next?</h2>
      <h2 className="title">Get In Touch</h2>
      <p>
        Whether you have a question or just want to say hi, I&apos;ll try my best to get back to
        you!
      </p>
      <a className="button button-lg email-link" href={`mailto:${email}`}>
        Say Hello
      </a>
    </StyledContactSection>
  );
}

export default ContactSection;
