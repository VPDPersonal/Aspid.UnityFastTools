using UnityEngine;

// ReSharper disable once CheckNamespace
namespace Aspid.UnityFastTools.Samples.ProfilerMarkers
{
    public class MarkerTest : MonoBehaviour
    {
        private void Update()
        {
            DoSomething1();
            DoSomething2();
        }

        private void DoSomething1()
        {
            using var _ = this.Marker();
            // Some code
        }

        private void DoSomething2()
        {
            using (this.Marker())
            {
                // Some code
                using var _ = this.Marker().WithName("Calculate");
                // Some code
            }    
        }
    }
}
