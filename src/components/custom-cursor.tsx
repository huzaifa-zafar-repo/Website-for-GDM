import { useEffect, useRef, useState } from "react";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;
    let trailX = 0;
    let trailY = 0;

    const updateCursor = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Update main cursor position immediately
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      // Smooth trailing animation for the glow
      if (trailRef.current) {
        const smoothTrail = () => {
          trailX += (e.clientX - trailX) * 0.1;
          trailY += (e.clientY - trailY) * 0.1;
          
          trailRef.current!.style.left = `${trailX}px`;
          trailRef.current!.style.top = `${trailY}px`;

          if (Math.abs(trailX - e.clientX) > 0.1 || Math.abs(trailY - e.clientY) > 0.1) {
            animationFrameId = requestAnimationFrame(smoothTrail);
          }
        };
        
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(smoothTrail);
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners for cursor movement
    document.addEventListener("mousemove", updateCursor);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, .cursor-hover'
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // Observer to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const newInteractiveElements = element.querySelectorAll(
              'a, button, [role="button"], input, textarea, select, .cursor-hover'
            );
            
            newInteractiveElements.forEach((el) => {
              el.addEventListener("mouseenter", handleMouseEnter);
              el.addEventListener("mouseleave", handleMouseLeave);
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      cancelAnimationFrame(animationFrameId);
      
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
      
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? "hovering" : ""}`}
        style={{
          position: "fixed",
          left: mousePosition.x,
          top: mousePosition.y,
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="cursor-core" />
        <div className="cursor-ring" />
      </div>

      {/* Trailing glow effect */}
      <div
        ref={trailRef}
        className="cursor-trail"
        style={{
          position: "fixed",
          left: mousePosition.x,
          top: mousePosition.y,
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
};
