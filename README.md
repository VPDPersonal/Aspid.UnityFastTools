# Unity Fast Tools
**Unity Fast Tools** is a set of tools designed to minimize routine code writing in Unity. 
## Source Code
### [[Aspid.UnityFastTools](https://github.com/VPDPersonal/Aspid.UnityFastTools)] [[Aspid.UnityFastTools.Generators](https://github.com/VPDPersonal/Aspid.UnityFastTools.Generators)]
---
## **Examples**
``` csharp
using UnityEngine;
using Aspid.UnityFastTools;

public class MyBehaviour : MonoBehaviour
{
    private void Update()
    {
        DoSomething1();
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
```
### Generated code
``` csharp
using Unity.Profiling;
using System.Runtime.CompilerServices;

internal static class __MyBehaviourProfilerMarkerExtensions
{
    private static readonly ProfilerMarker DoSomething1_line_13 = new("MyBehaviour.DoSomething1 (13)");
    private static readonly global::Unity.Profiling.ProfilerMarker DoSomething2_line_19 = new("MyBehaviour.DoSomething2 (19)");
    private static readonly global::Unity.Profiling.ProfilerMarker DoSomething2_line_22 = new("MyBehaviour.Calculate (22)");
 
    public static ProfilerMarker.AutoScope Marker(this MyBehaviour _, [CallerLineNumberAttribute] int line = -1)
    {
        if (line is 13) return DoSomething1_line_13.Auto();
        if (line is 19) return DoSomething2_line_19.Auto();
        if (line is 22) return DoSomething2_line_22.Auto();
        
        throw new global::System.Exception();
    }
}
```