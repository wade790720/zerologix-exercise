import { useRef, useEffect } from 'react';

export type Props = {
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
};

const Canvas = ({ width, height, draw }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const render = () => {
      if (ctx && canvas) {
        draw(ctx, canvas);
      }
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [draw]);

  return <canvas width={width} height={height} ref={canvasRef} />;
};

export default Canvas;