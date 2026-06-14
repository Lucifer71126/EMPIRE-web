"use client";

import { useEffect, useMemo, useState, type PointerEvent } from "react";
import { siteContent } from "@/data/content";
import { useToast } from "@/components/Toast";

type AnnotationRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Annotation = {
  id: string;
  rect: AnnotationRect;
  note: string;
  path: string;
  createdAt: string;
};

type Draft = {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
};

const MIN_RECT_SIZE = 12;

export function AnnotationTool() {
  const enabled = siteContent.maintenance.annotationEnabled;
  const storageKey = siteContent.maintenance.annotationStorageKey;
  const { showToast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [pendingRect, setPendingRect] = useState<AnnotationRect | null>(null);
  const [pendingNote, setPendingNote] = useState("");
  const [viewportKey, setViewportKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!enabled || !mounted) return;

    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) setAnnotations(JSON.parse(saved) as Annotation[]);
    } catch {
      setAnnotations([]);
    }
  }, [enabled, mounted, storageKey]);

  useEffect(() => {
    if (!enabled || !mounted) return;

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(annotations));
    } catch {
      // localStorage may be unavailable in private mode.
    }
  }, [annotations, enabled, mounted, storageKey]);

  useEffect(() => {
    if (!mounted) return;

    const updateViewport = () => setViewportKey((value) => value + 1);
    window.addEventListener("scroll", updateViewport, { passive: true });
    window.addEventListener("resize", updateViewport);
    return () => {
      window.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
    };
  }, [mounted]);

  const visibleAnnotations = useMemo(() => {
    if (!mounted) return [];
    return annotations.filter((item) => item.path === window.location.pathname);
  }, [annotations, mounted, viewportKey]);

  if (!enabled || !mounted) return null;

  function getRectFromDraft(nextDraft: Draft): AnnotationRect {
    const left = Math.min(nextDraft.startX, nextDraft.currentX);
    const top = Math.min(nextDraft.startY, nextDraft.currentY);
    const width = Math.abs(nextDraft.currentX - nextDraft.startX);
    const height = Math.abs(nextDraft.currentY - nextDraft.startY);

    return {
      x: left + window.scrollX,
      y: top + window.scrollY,
      width,
      height
    };
  }

  function startDrawing() {
    setPanelOpen(false);
    setDrawing(true);
    setDraft(null);
    showToast("拖动鼠标圈出要修改的位置，然后松开鼠标写批注。");
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!drawing) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDraft({
      startX: event.clientX,
      startY: event.clientY,
      currentX: event.clientX,
      currentY: event.clientY
    });
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drawing || !draft) return;
    setDraft({
      ...draft,
      currentX: event.clientX,
      currentY: event.clientY
    });
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!drawing || !draft) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    const rect = getRectFromDraft(draft);
    setDrawing(false);
    setDraft(null);

    if (rect.width < MIN_RECT_SIZE || rect.height < MIN_RECT_SIZE) {
      showToast("圈选区域太小，请重新拖动圈选。");
      return;
    }

    setPendingRect(rect);
    setPendingNote("");
  }

  function savePendingAnnotation() {
    if (!pendingRect || !pendingNote.trim()) {
      showToast("请先写下修改意见。");
      return;
    }

    const nextAnnotation: Annotation = {
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()),
      rect: pendingRect,
      note: pendingNote.trim(),
      path: window.location.pathname,
      createdAt: new Date().toLocaleString("zh-CN")
    };

    setAnnotations((items) => [...items, nextAnnotation]);
    setPendingRect(null);
    setPendingNote("");
    setPanelOpen(true);
    showToast("批注已保存。你可以继续圈选，或复制全部批注发给我。");
  }

  function deleteAnnotation(id: string) {
    setAnnotations((items) => items.filter((item) => item.id !== id));
  }

  async function copyAnnotations() {
    if (!visibleAnnotations.length) {
      showToast("当前页面还没有批注。");
      return;
    }

    const text = visibleAnnotations
      .map(
        (item, index) =>
          `${index + 1}. ${item.note}\n位置：左 ${Math.round(item.rect.x)}，上 ${Math.round(item.rect.y)}，宽 ${Math.round(item.rect.width)}，高 ${Math.round(item.rect.height)}\n时间：${item.createdAt}`
      )
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(text);
      showToast("已复制全部批注，可以直接粘贴发给我。");
    } catch {
      showToast("复制失败，请在批注面板里手动复制文字。");
    }
  }

  function clearAnnotations() {
    setAnnotations((items) => items.filter((item) => item.path !== window.location.pathname));
    showToast("当前页面批注已清空。");
  }

  const draftRect = draft ? getRectFromDraft(draft) : null;

  return (
    <>
      {visibleAnnotations.map((item, index) => (
        <div
          key={item.id}
          className="pointer-events-none fixed z-[70] rounded-md border-2"
          style={{
            left: item.rect.x - window.scrollX,
            top: item.rect.y - window.scrollY,
            width: item.rect.width,
            height: item.rect.height,
            borderColor: "var(--gold)",
            background: "rgba(200, 155, 60, 0.08)"
          }}
        >
          <span className="absolute -left-3 -top-3 grid h-7 w-7 place-items-center rounded-full text-xs font-semibold text-white" style={{ background: "var(--gold)" }}>
            {index + 1}
          </span>
        </div>
      ))}

      <button
        type="button"
        onClick={() => setPanelOpen((value) => !value)}
        className="fixed bottom-5 left-5 z-[75] rounded-full px-5 py-3 text-sm font-semibold text-white shadow-gold"
        style={{ background: "var(--gold)" }}
      >
        批注
      </button>

      {panelOpen ? (
        <aside className="fixed bottom-20 left-4 right-4 z-[75] max-h-[72vh] overflow-auto rounded-lg border p-5 shadow-gold sm:left-5 sm:right-auto sm:w-[380px]" style={{ borderColor: "var(--border)", background: "var(--bg-soft)", color: "var(--text)" }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">页面批注</h2>
              <p className="mt-1 text-sm leading-6" style={{ color: "var(--text-muted)" }}>
                点击“开始圈选”，在页面上拖出修改区域，然后写下意见。
              </p>
            </div>
            <button type="button" onClick={() => setPanelOpen(false)} className="rounded-full border px-3 py-1 text-sm" style={{ borderColor: "var(--border)" }}>
              关闭
            </button>
          </div>

          <div className="mt-5 grid gap-3">
            <button type="button" onClick={startDrawing} className="rounded-full px-5 py-3 text-sm font-semibold text-white" style={{ background: "var(--gold)" }}>
              开始圈选
            </button>
            <button type="button" onClick={copyAnnotations} className="rounded-full border px-5 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)" }}>
              复制全部批注给 Codex
            </button>
            <button type="button" onClick={clearAnnotations} className="rounded-full border px-5 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
              清空当前页面批注
            </button>
          </div>

          <div className="mt-5 grid gap-3">
            {visibleAnnotations.length ? (
              visibleAnnotations.map((item, index) => (
                <article key={item.id} className="rounded-md border p-4" style={{ borderColor: "var(--border)", background: "var(--bg-muted)" }}>
                  <div className="flex items-center justify-between gap-3">
                    <strong style={{ color: "var(--gold)" }}>批注 {index + 1}</strong>
                    <button type="button" onClick={() => deleteAnnotation(item.id)} className="text-xs" style={{ color: "var(--text-muted)" }}>
                      删除
                    </button>
                  </div>
                  <p className="mt-2 text-sm leading-6">{item.note}</p>
                  <p className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>{item.createdAt}</p>
                </article>
              ))
            ) : (
              <p className="rounded-md border p-4 text-sm leading-6" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                还没有批注。你可以先点“开始圈选”。
              </p>
            )}
          </div>
        </aside>
      ) : null}

      {drawing ? (
        <div
          className="fixed inset-0 z-[90] cursor-crosshair"
          style={{ background: "rgba(0, 0, 0, 0.08)" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="fixed left-1/2 top-5 -translate-x-1/2 rounded-full border px-5 py-3 text-sm font-semibold shadow-gold" style={{ borderColor: "var(--border)", background: "var(--bg-soft)", color: "var(--text)" }}>
            按住鼠标拖动，圈出要修改的位置
          </div>
          {draftRect ? (
            <div
              className="fixed rounded-md border-2"
              style={{
                left: draftRect.x - window.scrollX,
                top: draftRect.y - window.scrollY,
                width: draftRect.width,
                height: draftRect.height,
                borderColor: "var(--gold)",
                background: "rgba(200, 155, 60, 0.12)"
              }}
            />
          ) : null}
        </div>
      ) : null}

      {pendingRect ? (
        <div className="fixed inset-0 z-[95] grid place-items-center px-4" style={{ background: "rgba(0, 0, 0, 0.34)" }}>
          <div className="w-full max-w-lg rounded-lg border p-6 shadow-gold" style={{ borderColor: "var(--border)", background: "var(--bg-soft)", color: "var(--text)" }}>
            <h2 className="text-xl font-semibold">写下你的修改意见</h2>
            <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-muted)" }}>
              例如：这里标题改得更高端；这张图换成维港夜景；这个按钮颜色太重。
            </p>
            <textarea
              value={pendingNote}
              onChange={(event) => setPendingNote(event.target.value)}
              rows={5}
              className="mt-5 w-full rounded-md border px-4 py-3 outline-none"
              style={{ borderColor: "var(--border)", background: "var(--bg-muted)", color: "var(--text)" }}
              autoFocus
            />
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={savePendingAnnotation} className="rounded-full px-6 py-3 text-sm font-semibold text-white" style={{ background: "var(--gold)" }}>
                保存批注
              </button>
              <button type="button" onClick={() => setPendingRect(null)} className="rounded-full border px-6 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)" }}>
                取消
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
