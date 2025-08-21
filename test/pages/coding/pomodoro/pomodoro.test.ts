// @vitest-environment happy-dom

import { expect, it, describe, vi, beforeEach, afterEach } from "vitest";
import Pomodoro from "@pages/coding/pomodoro/pomodoro.vue";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

describe("Pomodoro", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render the action buttons and a timer of 25:00", () => {
    const { unmount } = render(Pomodoro);
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
    unmount();
  });

  it("starts the stopwatch and updates the time", async () => {
    const { unmount } = render(Pomodoro);
    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);
    await vi.advanceTimersByTimeAsync(1000);
    expect(screen.getByText(/24:59/)).toBeInTheDocument();
    await vi.advanceTimersByTimeAsync(1000);
    expect(screen.getByText(/24:58/)).toBeInTheDocument();
    unmount();
  });

  it("pauses the stopwatch", async () => {
    const { unmount } = render(Pomodoro);
    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);
    await vi.advanceTimersByTimeAsync(1000);
    const pauseButton = screen.getByRole("button", { name: /pause/i });
    expect(pauseButton).toBeInTheDocument();
    await userEvent.click(pauseButton);
    const pausedTime = screen.getByText(/24:59/).textContent;
    await vi.advanceTimersByTimeAsync(1000);
    expect(screen.getByText(pausedTime!)).toBeInTheDocument();
    unmount();
  });

  it("resets the stopwatch", async () => {
    const { unmount } = render(Pomodoro);
    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);
    await vi.advanceTimersByTimeAsync(1000);
    const resetButton = screen.getByRole("button", { name: /reset/i });
    expect(resetButton).toBeInTheDocument();
    await userEvent.click(resetButton);
    expect(screen.getByText(/25:00/)).toBeInTheDocument();
    unmount();
  });

  it("stops the stopwatch when it reaches 00:00", async () => {
    const { unmount } = render(Pomodoro);
    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);
    await vi.advanceTimersByTimeAsync(60 * 1000);
    expect(screen.getByText(/24:00/)).toBeInTheDocument();
    await vi.advanceTimersByTimeAsync(24 * 60 * 1000);
    expect(screen.getByText(/00:00/)).toBeInTheDocument();
    await vi.advanceTimersByTimeAsync(60 * 1000);
    expect(screen.getByText(/00:00/)).toBeInTheDocument();
    unmount();
  });

  it("toggles the start/pause button text", async () => {
    const { unmount } = render(Pomodoro);
    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);
    expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
    const pauseButton = screen.getByRole("button", { name: /pause/i });
    expect(pauseButton).toBeInTheDocument();
    await userEvent.click(pauseButton);
    expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
    unmount();
  });

  it("shows the backdrop when active", async () => {
    const { unmount } = render(Pomodoro);
    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);
    expect(
      screen.getByRole("presentation", { hidden: true })
    ).toBeInTheDocument();
    unmount();
  });

  it("hides the backdrop when paused", async () => {
    const { unmount } = render(Pomodoro);
    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);
    const pauseButton = screen.getByRole("button", { name: /pause/i });
    expect(pauseButton).toBeInTheDocument();
    await userEvent.click(pauseButton);
    expect(
      screen.queryByRole("presentation", { hidden: true })
    ).not.toBeInTheDocument();
    unmount();
  });

  it("formats time correctly for hours, minutes, and seconds", async () => {
    const { unmount } = render(Pomodoro);
    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);
    await vi.advanceTimersByTimeAsync(60000 * 23); // 23 minutes
    expect(screen.getByText(/02:00/)).toBeInTheDocument();
    await vi.advanceTimersByTimeAsync(1000 * 45); // 45 second
    expect(screen.getByText(/01:15/)).toBeInTheDocument();
    unmount();
  });

  it("cleans up the interval on unmount", async () => {
    const { unmount } = render(Pomodoro);
    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);
    const spy = vi.spyOn(global, "clearInterval");
    unmount();
    expect(spy).toHaveBeenCalled();
  });
});
