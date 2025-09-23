// @vitest-environment happy-dom

import { expect, it, describe, vi, beforeEach, afterEach } from "vitest";
import Pomodoro from "@pages/coding/pomodoro/_pomodoro.vue";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

describe("Pomodoro", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render the action buttons, the state and a timer of 25:00", () => {
    const { unmount } = render(Pomodoro);
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Previous" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Current state" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("timer", { name: "Remaining time" })
    ).toBeInTheDocument();
    unmount();
  });

  it("starts the stopwatch and updates the time", async () => {
    const { unmount } = render(Pomodoro);
    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);
    await vi.advanceTimersByTimeAsync(1000);
    const timer = screen.getByRole("timer", {
      name: "Remaining time",
    });
    expect(timer).toBeInTheDocument();
    expect(timer).toHaveTextContent(/24:59/);
    await vi.advanceTimersByTimeAsync(1000);
    expect(timer).toHaveTextContent(/24:58/);
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
    const timer = screen.getByRole("timer", {
      name: "Remaining time",
    });
    expect(timer).toBeInTheDocument();
    expect(timer).toHaveTextContent(/24:59/);
    await vi.advanceTimersByTimeAsync(1000);
    expect(timer).toHaveTextContent(/24:59/);
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
    const timer = screen.getByRole("timer", {
      name: "Remaining time",
    });
    expect(timer).toBeInTheDocument();
    expect(timer).toHaveTextContent(/25:00/);
    unmount();
  });

  it("stops the stopwatch when it reaches 00:00", async () => {
    const { unmount } = render(Pomodoro);
    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);
    await vi.advanceTimersByTimeAsync(60 * 1000);
    const timer = screen.getByRole("timer", {
      name: "Remaining time",
    });
    expect(timer).toBeInTheDocument();
    expect(timer).toHaveTextContent(/24:00/);
    await vi.advanceTimersByTimeAsync(24 * 60 * 1000);
    expect(timer).toHaveTextContent(/00:00/);
    await vi.advanceTimersByTimeAsync(60 * 1000);
    expect(timer).toHaveTextContent(/00:00/);
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
    expect(
      screen.getByRole("presentation", { hidden: true })
    ).toBeInTheDocument();
    const pauseButton = screen.getByRole("button", { name: /pause/i });
    expect(pauseButton).toBeInTheDocument();
    await userEvent.click(pauseButton);
    expect(
      screen.queryByRole("presentation", { hidden: true })
    ).not.toBeInTheDocument();
    unmount();
  });

  it("pauses when a click on the backdrop occurs", async () => {
    const { unmount } = render(Pomodoro);
    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);
    const backdrop = screen.getByRole("presentation", { hidden: true });
    expect(backdrop).toBeInTheDocument();
    await userEvent.click(backdrop);
    expect(
      screen.queryByRole("presentation", { hidden: true })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /pause/i })
    ).not.toBeInTheDocument();
    unmount();
  });

  it("formats time correctly for hours, minutes, and seconds", async () => {
    const { unmount } = render(Pomodoro);
    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);
    const timer = screen.getByRole("timer", {
      name: "Remaining time",
    });
    expect(timer).toBeInTheDocument();
    expect(timer).toHaveTextContent(/25:00/);
    await vi.advanceTimersByTimeAsync(60000 * 23); // 23 minutes
    expect(timer).toHaveTextContent(/02:00/);
    await vi.advanceTimersByTimeAsync(1000 * 45); // 45 second
    expect(timer).toHaveTextContent(/01:15/);
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

  it("should go through the correct states when clicking next", async () => {
    const { unmount } = render(Pomodoro);
    const nextButton = screen.getByRole("button", { name: "Next" });
    expect(nextButton).toBeInTheDocument();
    let status = screen.getByRole("status", {
      name: "Current state",
    });
    expect(status).toBeInTheDocument();
    expect(status).toHaveTextContent("Pomodoro");
    await userEvent.click(nextButton);
    expect(status).toHaveTextContent("Short break");
    await userEvent.click(nextButton);
    expect(status).toHaveTextContent("Pomodoro");
    await userEvent.click(nextButton);
    expect(status).toHaveTextContent("Short break");
    await userEvent.click(nextButton);
    expect(status).toHaveTextContent("Pomodoro");
    await userEvent.click(nextButton);
    expect(status).toHaveTextContent("Short break");
    await userEvent.click(nextButton);
    expect(status).toHaveTextContent("Pomodoro");
    await userEvent.click(nextButton);
    expect(status).toHaveTextContent("Long break");
    await userEvent.click(nextButton);
    expect(status).toHaveTextContent("Pomodoro");
    unmount();
  });

  it("should go through the correct states when clicking previous", async () => {
    const { unmount } = render(Pomodoro);
    const previousButton = screen.getByRole("button", { name: "Previous" });
    expect(previousButton).toBeInTheDocument();
    let status = screen.getByRole("status", {
      name: "Current state",
    });
    expect(status).toBeInTheDocument();
    expect(status).toHaveTextContent("Pomodoro");
    await userEvent.click(previousButton);
    expect(status).toHaveTextContent("Long break");
    await userEvent.click(previousButton);
    expect(status).toHaveTextContent("Pomodoro");
    await userEvent.click(previousButton);
    expect(status).toHaveTextContent("Short break");
    await userEvent.click(previousButton);
    expect(status).toHaveTextContent("Pomodoro");
    await userEvent.click(previousButton);
    expect(status).toHaveTextContent("Short break");
    await userEvent.click(previousButton);
    expect(status).toHaveTextContent("Pomodoro");
    await userEvent.click(previousButton);
    expect(status).toHaveTextContent("Short break");
    await userEvent.click(previousButton);
    expect(status).toHaveTextContent("Pomodoro");
    unmount();
  });
});
