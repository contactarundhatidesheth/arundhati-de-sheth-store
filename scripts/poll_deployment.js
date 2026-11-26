async function checkStatus() {
  for (let i = 0; i < 20; i++) {
    const r = await fetch('https://api.github.com/repos/contactarundhatidesheth/arundhati-de-sheth-store/commits/main/check-runs', {
      headers: { 'User-Agent': 'Node' }
    });
    const d = await r.json();
    const run = d.check_runs?.[0];
    console.log('Poll ' + (i + 1) + ': status = ' + run?.status + ', conclusion = ' + run?.conclusion);
    if (run?.status === 'completed' && run?.conclusion === 'success') {
      return run;
    }
    await new Promise(res => setTimeout(res, 8000));
  }
}
checkStatus();
