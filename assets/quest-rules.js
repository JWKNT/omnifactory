// The rules of the game's quest book, in one place for the page's script and for the build.
// They follow Better Questing: which quests are open, which ones the book shows, and the
// state that sets a quest's colour. `done` maps a quest id to [ticks, claimed].
(scope => {
  // Open: all requirements are complete, or one of them when the quest says OR.
  function unlocked(quest, done) {
    const pre = (quest && quest.pre) || [];
    if (!pre.length) return true;
    const complete = pre.filter(id => done[id]).length;
    return quest.logic === 'OR' ? complete > 0 : complete === pre.length;
  }

  // The quests that the book shows to a player. HIDDEN quests are never in a line.
  function shown(book, done, id, seen) {
    const quest = book.quests[id];
    if (!quest) return false;
    const open = q => Boolean(done[q]) || unlocked(book.quests[q], done);
    switch (quest.vis) {
      case 'ALWAYS': return true;
      case 'HIDDEN': return false;
      case 'UNLOCKED': return open(id);
      // A locked quest shows early when the quests before it are open.
      case 'NORMAL': return open(id) || (quest.pre || []).every(p => !book.quests[p] || unlocked(book.quests[p], done));
      case 'COMPLETED': return Boolean(done[id]);
      case 'CHAIN': {
        if (!(quest.pre || []).length) return true;
        const trail = seen || new Set();
        if (trail.has(id)) return false;
        trail.add(id);
        return quest.pre.some(p => !book.quests[p] || shown(book, done, p, trail));
      }
      default: return true;
    }
  }

  // complete, unclaimed (complete with a reward that waits), open, or locked.
  function stateOf(book, done, id) {
    const quest = book.quests[id];
    const entry = done[id];
    if (entry) return entry[1] || !(quest && quest.rewards && quest.rewards.length) ? 'complete' : 'unclaimed';
    return unlocked(quest, done) ? 'open' : 'locked';
  }

  // The quests of a line that the book shows; a quest with no size is a junction of lines.
  const visible = (book, done, line) => line.quests.filter(q => shown(book, done, q.id));
  const buttons = (book, done, line) => visible(book, done, line).filter(q => q.w > 0 && q.h > 0);

  // Counts across the book. A quest that is in two lines counts one time.
  function summary(book, progress) {
    const done = (progress && progress.done) || {};
    const ids = new Set();
    for (const line of book.lines) for (const q of buttons(book, done, line)) ids.add(q.id);
    let complete = 0;
    for (const id of ids) if (done[id]) complete++;
    return { total: ids.size, complete, ticks: progress && progress.ticks != null ? progress.ticks : null };
  }

  scope.QuestRules = { unlocked, shown, stateOf, visible, buttons, summary };
})(globalThis);
